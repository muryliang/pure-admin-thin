<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import {
  addTunnels,
  delTunnels,
  getSas,
  startTunnels,
  stopTunnels
} from "@/api/ipsec";

const loading = ref(false);
const salist = ref<SaInfo[]>([]);

const getSa = async () => {
  loading.value = true;
  try {
    const { data } = await getSas();
    salist.value = data.list;
  } catch (e) {
    console.log(e);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
};

onMounted(() => {
  getSa();
});

const formInline = reactive({
  ike: "",
  child: ""
});

const clearInput = () => {
  // formInline.ike = "";
  // formInline.child = "";
};

const addSa = () => {
  if (formInline.ike && formInline.child) {
    addTunnels({
      ike: formInline.ike,
      child: formInline.child
    });
    getSa();
  }
  clearInput();
};

const delSa = () => {
  if (formInline.ike) {
    delTunnels({
      ike: formInline.ike,
      child: formInline.child
    });
    getSa();
  }
  clearInput();
};

const startTunnel = () => {
  if (formInline.ike && formInline.child) {
    startTunnels({
      ike: formInline.ike,
      child: formInline.child
    });
  }
  clearInput();
};

const stopTunnel = () => {
  if (formInline.ike && formInline.child) {
    stopTunnels({
      ike: formInline.ike,
      child: formInline.child
    });
  }
  clearInput();
};
</script>

<template>
  <div>
    <h3>this is ipsec page</h3>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="ike">
        <el-input v-model="formInline.ike" placeholder="ike name" />
      </el-form-item>
      <el-form-item label="child">
        <el-input v-model="formInline.child" placeholder="child name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addSa">Add</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="delSa">Del</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getSa">Query</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="startTunnel">Start</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="stopTunnel">Stop</el-button>
      </el-form-item>
    </el-form>

    <div v-loading="loading">
      {{ salist }}
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
