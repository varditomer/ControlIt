<template>
  <div class="accounts">
    <v-container>
      <!-- <v-row>
        <v-col cols="12" md="4">
          <v-select
            v-model="selectedPartnerId"
            :items="partnerIds"
            label="Select Partner ID"
            @change="filterAccounts"
          ></v-select>
        </v-col>
      </v-row> -->
      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="filteredAccounts"
            item-value="id"
          >
            <!-- <template #item.actions="{ item }">
              <v-btn
                color="primary"
                small
              >
                Open
              </v-btn>
            </template> -->
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/stores/account.store'
import { ref, computed } from 'vue'

const selectedPartnerId = ref(null)

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  // { title: 'Actions', key: 'actions', sortable: false },
]

const accountStore = useAccountStore()

const accounts = computed(() => accountStore.accounts)
const partnerIds = computed(() => accountStore.partnerIds)

const filteredAccounts = [
{
  id: 1,
  name: "account 1",
  // url: "https://www.google.com"
},
{
  id: 2,
  name: "account 2",
  // url: "https://www.google.com"
},
{
  id: 3,
  name: "account 3",
  // url: "https://www.google.com"
},
]

// const filteredAccounts = computed(() => {
//   console.log(`selectedPartnerId.value:`, selectedPartnerId.value)
//   console.log(`accounts.value:`, accounts.value)
//   if (selectedPartnerId.value) {
//     const filteredAccounts =  accounts?.value?.filter(
//       (account) => account.partner_id === selectedPartnerId.value
//     )
//   }
//   console.log(`accounts.value:`, accounts.value)
//   return accounts.value
// })

function filterAccounts() {
  return filteredAccounts
}

function openAccountPage(urlCode: string) {
  window.open(`${urlCode}`, '_blank')
}
</script>

<style scoped>
.accounts {
  padding: 20px;
}
</style>
