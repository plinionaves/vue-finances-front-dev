<template>
  <v-navigation-drawer
    :value="value"
    @input="$emit('input', $event)"
    :mini-variant="mini"
    absolute
    temporary
  >

    <v-list>

      <v-list-tile
        v-if="mini"
        @click.stop="mini = !mini"
      >
        <v-list-tile-action>
          <v-icon>chevron_right</v-icon>
        </v-list-tile-action>
      </v-list-tile>

      <v-list-tile
        avatar
        tag="div"
      >
        <v-list-tile-avatar>
          <v-icon>person</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ user.name }}</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn
            icon
            @click.stop="mini = !mini"
          >
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>

    </v-list>

    <v-list
      class="pt-0"
      dense
    >
      <v-divider light></v-divider>

      <v-list-tile
        v-for="item in items"
        :key="item.title"
        :to="item.url"
        :exact="item.exact"
        @click.stop="$emit('input', false)"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

  </v-navigation-drawer>
</template>

<script>

import AuthService from '@/modules/auth/services/auth-service'

export default {
  name: 'AppMenu',
  props: {
    value: Boolean
  },
  data: () => ({
    items: [
      { title: 'Home', icon: 'dashboard', url: '/dashboard', exact: true },
      { title: 'Receita', icon: 'add', url: '/dashboard/records/add?type=credit', exact: true },
      { title: 'Despesa', icon: 'remove', url: '/dashboard/records/add?type=debit', exact: true },
      { title: 'Relatórios', icon: 'assessment', url: '/dashboard/reports', exact: true }
    ],
    mini: false,
    user: {}
  }),
  async created () {
    this.user = await AuthService.user()
  }
}
</script>
