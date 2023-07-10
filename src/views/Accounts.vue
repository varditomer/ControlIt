<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-select
            v-model="selectedPartnerId"
            :items="['All', ...partnerIds]"
            label="Select Partner ID"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
          <v-table class="accounts-table" overflow-y-hidden>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Places</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="selectedPartnerId === 'All'">
                <template v-for="(partnerId, index) in partnerIds">
                  <tr v-if="filteredAccountsByPartnerId(partnerId).length > 0" :key="`partner-${partnerId}`">
                    <td colspan="4">
                      <h3 class="text-center">{{ `Partner ID: ${partnerId}` }}</h3>
                    </td>
                  </tr>
                  <tr v-for="(account, i) in filteredAccountsByPartnerId(partnerId)" :key="account._id">
                    <td>{{ i + 1 }}</td>
                    <td>{{ account.name }}</td>
                    <td>
                      <v-row dense>
                        <v-col cols="12">
                          <v-sheet height="100px" class="overflow-y-auto">
                            <ul>
                              <li v-for="place in getRandomPlaces()" :key="place">
                                {{ place }}
                              </li>
                            </ul>
                          </v-sheet>
                        </v-col>
                      </v-row>
                    </td>
                    <td align="center">
                      <v-btn color="primary" small @click="openImpersonateLink(account.url_code)">
                        Impersonate
                      </v-btn>
                    </td>
                  </tr>
                </template>
              </template>
              <template v-else>
                <tr v-for="(account, i) in filteredAccounts" :key="account._id">
                  <td>{{ i + 1 }}</td>
                  <td>{{ account.name }}</td>
                  <td>
                    <v-row dense>
                      <v-col cols="12">
                        <v-sheet height="100px" class="overflow-y-auto">
                          <ul>
                            <li v-for="place in getRandomPlaces()" :key="place">
                              {{ place }}
                            </li>
                          </ul>
                        </v-sheet>
                      </v-col>
                    </v-row>
                  </td>
                  <td>
                    <v-btn color="primary" small @click="openImpersonateLink(account.url_code)">
                      Impersonate
                    </v-btn>
                  </td>
                </tr>
              </template>
            </tbody>
          </v-table>
      </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/stores/account.store'
import { ref, computed } from 'vue'

const selectedPartnerId = ref<string>('All') // Set 'All' as the default selection

const accountStore = useAccountStore()

const accounts = computed(() => accountStore.accounts)
const partnerIds = computed(() => accountStore.partnerIds)

const filteredAccounts = computed(() => {
  if (selectedPartnerId.value !== null && selectedPartnerId.value !== 'All') {
    return accounts.value.filter((account) => account.partner_id === selectedPartnerId.value)
  }
  return accounts.value
})

function filteredAccountsByPartnerId(partnerId: string) {
  if (partnerId === 'All') {
    return accounts.value
  }
  return accounts.value.filter((account) => account.partner_id === partnerId)
}

function openImpersonateLink(urlCode: string) {
  window.open(urlCode, '_blank', 'noopener noreferrer')
}

const places = ['Place A', 'Place B', 'Place C', 'Place D', 'Place E', 'Place F']

function getRandomPlaces() {
  const numPlaces = Math.floor(Math.random() * places.length) + 1
  return places.slice(0, numPlaces)
}
</script>

<style scoped>
.accounts-table {
  overflow-y: hidden;
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border: 1px solid #ccc;
}

.overflow-y-auto {
  overflow-y: auto;
}
</style>
