-- ─── Profiles ─────────────────────────────────────────────────────────────────
-- Extension automatique de auth.users avec le display_name
create table if not exists public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  display_name text,
  created_at  timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Profil visible par le propriétaire uniquement"
  on public.profiles for all
  using (auth.uid() = id);

-- Trigger : créer le profil automatiquement à l'inscription
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── Progression des leçons ────────────────────────────────────────────────────
create table if not exists public.lesson_progress (
  id                      uuid default gen_random_uuid() primary key,
  user_id                 uuid references auth.users(id) on delete cascade not null,
  module_id               text not null,
  lesson_id               text not null,
  quiz_score              integer default 0,
  quiz_completed          boolean default false,
  exercise_attempted      boolean default false,
  solution_revealed       boolean default false,
  validated               boolean default false,
  user_exercise_answer    text,
  completed_at            timestamptz,
  created_at              timestamptz default now(),
  updated_at              timestamptz default now(),
  unique(user_id, module_id, lesson_id)
);

alter table public.lesson_progress enable row level security;

create policy "Progression visible par le propriétaire uniquement"
  on public.lesson_progress for all
  using (auth.uid() = user_id);

-- Trigger : mettre à jour updated_at automatiquement
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger lesson_progress_updated_at
  before update on public.lesson_progress
  for each row execute procedure public.set_updated_at();

-- ─── Badges utilisateurs ───────────────────────────────────────────────────────
create table if not exists public.user_badges (
  id         uuid default gen_random_uuid() primary key,
  user_id    uuid references auth.users(id) on delete cascade not null,
  badge_id   text not null,
  earned_at  timestamptz default now(),
  unique(user_id, badge_id)
);

alter table public.user_badges enable row level security;

create policy "Badges visibles par le propriétaire uniquement"
  on public.user_badges for all
  using (auth.uid() = user_id);

-- ─── Index pour les performances ───────────────────────────────────────────────
create index if not exists idx_lesson_progress_user_id on public.lesson_progress(user_id);
create index if not exists idx_lesson_progress_module on public.lesson_progress(user_id, module_id);
create index if not exists idx_user_badges_user on public.user_badges(user_id);
