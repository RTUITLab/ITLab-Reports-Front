declare module 'globals' {
  import { Globals } from '@/globals';
  import { UserManager } from '@/UserManager';

  module 'vue/types/vue' {
    interface Vue {
      $g: Globals;
      $userManager: UserManager;
    }
  }
}
