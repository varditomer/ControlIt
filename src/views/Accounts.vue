<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-select v-model="selectedPartner" :item-title="'name'" :item-value="'_id'"
          :items="[{ _id: 'All', name: 'All' }, ...partners]" label="Select Partner"></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-table class="accounts-table" style="overflow-y: hidden;">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Places</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="selectedPartner === 'All'">
            <template v-for="(partner) in partners">
              <tr v-if="filteredAccountsByPartnerId(partner._id).length > 0" :key="`partner-${partner._id}`">
                <td colspan="4">
                  <h3 class="text-center">{{ partner.name }}</h3>
                </td>
              </tr>
              <tr v-for="(account, i) in filteredAccountsByPartnerId(partner._id)" :key="account._id">
                <td>{{ i + 1 }}</td>
                <td>{{ account.name }}</td>
                <td class="no-padding">
                  <v-row dense>
                    <v-col cols="12">
                      <v-sheet align="center">
                        <ul class="overflow-overlay">
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
              <td class="no-padding">
                  <v-row dense>
                    <v-col cols="12">
                      <v-sheet align="center">
                        <ul class="overflow-overlay">
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

const selectedPartner = ref<string>('All') // Set 'All' as the default selection

const accountStore = useAccountStore()

const accounts = computed(() => accountStore.accounts)
const partners = computed(() => accountStore.partners)

const filteredAccounts = computed(() => {
  if (selectedPartner.value !== null && selectedPartner.value !== 'All') {
    return accounts.value.filter((account) => account.partner_id === selectedPartner.value)
  }
  return accounts.value
})

function filteredAccountsByPartnerId(partner: string) {
  if (partner === 'All') return accounts.value
  return accounts.value.filter((account) => account.partner_id === partner)
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
  width: 100%;
  border-collapse: collapse;
}

.accounts-table .v-table__wrapper {
  background-color: black;
  overflow: hidden !important;
}

th,
td {
  padding: 8px;
  border: 1px solid #ccc;
}
.no-padding {
  padding: 0 !important;
}

.overflow-overlay {
  max-height: 78px;
  overflow: auto;
  scrollbar-gutter: stable;
}
</style>
