import { GetterTree, ActionTree, MutationTree } from "vuex";
import pathify, { make, Payload } from "../index";

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
