// See here for vuex typescript conversation: https://github.com/vuejs/vuex/issues/564

import Vue from "vue";
import vuex, {
  Store,
  CommitOptions,
  DispatchOptions,
  GetterTree,
  ActionTree,
  MutationTree
} from "vuex";
import { createDecorator } from "vue-class-component";

/************************************************************************
 ***                          DEFAULT EXPORT                          ***
 ***********************************************************************/
type MappingTypes = "state" | "getters" | "mutations" | "actions";
type MappingPresets = "standard" | "simple";
type MappingFunction = (
  type: MappingTypes,
  name: string,
  formatters: MappingFormatters
) => string;

interface MappingFormatters {
  camel: (...args: string[]) => string;
  snake: (...args: string[]) => string;
  const: (...args: string[]) => string;
}

interface Options {
  mapping: MappingPresets | MappingFunction;
  deep: 1 | 2 | 3;
  strict: boolean;
  cache: boolean;
}

interface DefaultExport {
  debug: () => void;
  plugin: <S>(store: Store<S>) => void;
  options: Options;
}

declare const defaultExport: DefaultExport;

export default defaultExport;

/************************************************************************
 ***                            NAMED EXPORTS                         ***
 ***********************************************************************/

/*--------------------------------------------------------------------------
                                  SHARED 	                              
------------------------------------------------------------------------*/
type GetAccessor<T = any> = () => T;
type SetAccessor<T> = (newValue: T) => T; // TODO: Do setters always return same type as input.

/*--------------------------------------------------------------------------
                                   make 	                                
------------------------------------------------------------------------*/
type StateFunction<T> = () => T;

interface Make {
  mutations: <State>(
    state: State | StateFunction<State>
  ) => MutationTree<State>;

  actions: <State, RootState>(
    state: State | StateFunction<State>
  ) => ActionTree<State, RootState>;

  getters: <State, RootState>(
    state: State | StateFunction<State>
  ) => GetterTree<State, RootState>;
}

export const make: Make;

/*--------------------------------------------------------------------------
                                Payload	                                
------------------------------------------------------------------------*/
// TODO: Not documented/public class, may need refinement by module author.
export class Payload {
  constructor(path: string, value: any);
  expr: string;
  path: string;
  value: any;
  update<T extends object>(target: T): T; // TODO: Needs details. Define an interface instead of object. And be sure that return type is same as input.
}

/*--------------------------------------------------------------------------
                             get/sync/call                               
------------------------------------------------------------------------*/
/**
 * Create get accessors
 *
 * Note type definitions do not support wildcards
 */
export function get<T extends {}>(
  path: string | object,
  props: Array<keyof T> | { [K in keyof T]: string }
): { [K in keyof T]: { get: GetAccessor<T[K]> } };
export function get<T = any>(
  path: string | object,
  props?: string[] | object
): { get: GetAccessor<T> };

/**
 * Create get/set accessors
 *
 * Note type definitions do not support wildcards
 */
export function sync<T extends {}>(
  path: string | object,
  props: Array<keyof T> | { [K in keyof T]: string }
): { [K in keyof T]: { get: GetAccessor<T[K]>; set: SetAccessor<T[K]> } };
export function sync<T = any>(
  path: string | object,
  props?: string[] | object
): { get: GetAccessor<T>; set: SetAccessor<T> };

export function call(
  path: string | object,
  props?: string[] | object
): (payload: any) => any | Promise<any>;

/*--------------------------------------------------------------------------
                           Property Decorators                               
------------------------------------------------------------------------*/
export function Get(path: string): ReturnType<typeof createDecorator>;

export function Sync(path: string): ReturnType<typeof createDecorator>;

export function Call(path: string): ReturnType<typeof createDecorator>;

/*--------------------------------------------------------------------------
                                  commit                                 
------------------------------------------------------------------------*/
// Copied from vuex types.
export function commit(
  type: string,
  payload?: any,
  options?: CommitOptions
): void;
export function commit<P extends Payload>(
  payloadWithType: P,
  options?: CommitOptions
): void;

/*--------------------------------------------------------------------------
                                 dispatch                                
------------------------------------------------------------------------*/
// Copied from vuex types.
export function dispatch(
  type: string,
  payload?: any,
  options?: DispatchOptions
): Promise<any>;
export function dispatch<P extends Payload>(
  payloadWithType: P,
  options?: DispatchOptions
): Promise<any>;

/*--------------------------------------------------------------------------
                             registerModule                              
 ------------------------------------------------------------------------*/
export function registerModule(
  path: string | string[],
  module: object,
  callback: (...args: any[]) => any, // TODO: Needs refinement.
  options: object
): object; // TODO: Needs more details from module author.
