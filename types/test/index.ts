import Vue from 'vue';
import { GetterTree, ActionTree, MutationTree } from "vuex";
import pathify, { make, get } from "../index";

interface RootState {
  name: string;
}

const state: RootState = { name: "name" };

const getters: GetterTree<RootState, RootState> = {
  ...make.getters(state)
};

const mutations: MutationTree<RootState> = {
  ...make.mutations(state)
};

const actions: ActionTree<RootState, RootState> = {
  ...make.actions(state)
};

const plugin = pathify.plugin;

Vue.extend({
  computed: {
    foo: get('foo'),
    bar: get<string>('bar'),
    baz: get<{ type: 'baz' }>('baz')
  },
  created () {
    this.foo // any
    this.bar // string
    this.baz // object
    this.baz.type
  }
})
