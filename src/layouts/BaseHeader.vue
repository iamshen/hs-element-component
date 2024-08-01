<script lang="ts" setup>
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
import { toggleDark } from '~/composables'
</script>

<template>
  <ElMenu class="el-menu-demo" mode="horizontal" router default-active="/table">
    <ElMenuItem index="/">
      Hs Element Plus
    </ElMenuItem>
    <ElSubMenu index="/docs">
      <template #title>
        v4.x
      </template>
      <ElMenuItem index="/docs/v3">
        v3.x <i class="i-ep:top-right w-1em h-1em" />
      </ElMenuItem>
      <ElMenuItem index="/docs/v2">
        v2.x <i class="i-ep:top-right w-1em h-1em" />
      </ElMenuItem>
      <ElMenuItem index="/docs/v1">
        v1.x <i class="i-ep:top-right w-1em h-1em" />
      </ElMenuItem>
    </ElSubMenu>

    <ElMenuItem index="/table?terminalCode=851720169442079">
      HsTable
    </ElMenuItem>
    <ElMenuItem index="/form">
      HsForm
    </ElMenuItem>
    <ElMenuItem h="full" @click="toggleDark()">
      <button
        class="border-none w-full bg-transparent cursor-pointer"
        style="height: var(--ep-menu-item-height)"
      >
        <i inline-flex i="dark:ep-moon ep-sunny" />
      </button>
    </ElMenuItem>
  </ElMenu>
</template>
