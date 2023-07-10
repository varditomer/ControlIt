<template>
  <div class="accounts">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-select
            v-model="selectedPartnerId"
            :items="partnerIds"
            label="Select Partner ID"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="account in filteredAccounts" :key="account._id">
                <td>{{ account._id }}</td>
                <td>{{ account.name }}</td>
                <td>
                  <v-btn color="primary" small @click="openAccountPage(account.url_code)">
                    Impersonate
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/stores/account.store'
import { ref, computed } from 'vue'

const selectedPartnerId = ref<string | null>(null)

const accountStore = useAccountStore()

const accounts = computed(() => accountStore.accounts)
const partnerIds = computed(() => accountStore.accounts.map((account) => account.partner_id))

const filteredAccounts = computed(() => {
  if (selectedPartnerId.value) {
    return accounts.value.filter((account) => account.partner_id === selectedPartnerId.value)
  }
  return accounts.value
})

function filterAccounts() {
  // Perform any necessary actions when filtering accounts
}

function openAccountPage(urlCode: string) {
  window.open(`${urlCode}`, '_blank')
}
</script>

<style scoped>
.accounts {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border: 1px solid #ccc;
}
</style>
