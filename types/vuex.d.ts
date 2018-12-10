/**
 * Extends interfcae of vuex
 */

import vuex from "vuex";

declare module "vuex" {
  // Here should be defined added features to vuex and stores
  // import vuex, { Store } from "vuex";

  // Signatures from https://davestewart.github.io/vuex-pathify/#/api/accessors
  interface Store<S> {
    get: (path: string, ...args: any[]) => any;
    set: (path: string, value: any) => any | Promise<any>;
    copy: (path: string) => any;
  }
}
