import Vue from 'vue'

import UiModal from './ui/UiModal'
import UiTable from './ui/UiTable'

import UiInput from './ui/UiInput'
import UiButton from './ui/UiButton'
import UiSelect from './ui/UiSelect'
import UiIcon from './ui/UiIcon'

import ViewCode from './nav/EditCode'
import ViewDocs from './nav/ViewDocs'

Vue.component('ui-modal', UiModal)
Vue.component('ui-table', UiTable)

Vue.component('ui-input', UiInput)
Vue.component('ui-button', UiButton)
Vue.component('ui-select', UiSelect)
Vue.component('ui-icon', UiIcon)

Vue.component('edit-code', ViewCode)
Vue.component('view-docs', ViewDocs)
