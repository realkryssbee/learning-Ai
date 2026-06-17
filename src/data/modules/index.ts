export { module1 } from './module1-fondamentaux';
export { module2 } from './module2-prompt-engineering';
export { module3 } from './module3-claude-code';
export { module4 } from './module4-mcp';
export { module5 } from './module5-agents';
export { module6 } from './module6-git-github';
export { module7 } from './module7-supabase';
export { module8 } from './module8-projet';

import { module1 } from './module1-fondamentaux';
import { module2 } from './module2-prompt-engineering';
import { module3 } from './module3-claude-code';
import { module4 } from './module4-mcp';
import { module5 } from './module5-agents';
import { module6 } from './module6-git-github';
import { module7 } from './module7-supabase';
import { module8 } from './module8-projet';
import type { Module } from '@/types';

export const ALL_MODULES: Module[] = [
  module1,
  module2,
  module3,
  module4,
  module5,
  module6,
  module7,
  module8,
];
