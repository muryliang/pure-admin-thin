<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getNetworkInfo, setNetworkInfo } from "@/api/system";
const netInfos = ref<NetworkInfo[]>([]);
const loading = ref(false);
let number = 0;

type NetworkInfo = {
  /** 网口名 */
  interface: string;
  /** 网口地址 todo: 可能是一个list*/
  ipv4addr: string;
  /** `网口掩码` */
  netmask: number;
};

const setData: NetworkInfo = {
  interface: "eth0",
  ipv4addr: "192.168.3.1",
  netmask: 24
};

const getNetworkData = async () => {
  loading.value = true;
  try {
    const { data } = await getNetworkInfo();
    netInfos.value = data.list;
    console.log(data);
  } catch (e) {
    console.log(e);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
};

const setNetworkData = async () => {
  try {
    number++;
    setData.ipv4addr = `192.168.${number}.1`;
    const resp = await setNetworkInfo(setData);
    console.log("set data finished with ");
    console.log(resp);
  } catch (e) {
    console.log(e);
  }
};

onMounted(async () => {
  await getNetworkData();
});
</script>

<template>
  <div>
    <h3>this is networking page</h3>
    <el-button @click="getNetworkData">get</el-button>
    <el-button @click="setNetworkData">set</el-button>
    <ul v-loading="loading">
      <li class="netInfo" v-for="netInfo in netInfos" :key="netInfo">
        <p>{{ netInfo.interface }}</p>
        <p>{{ netInfo.ipv4addr }}/{{ netInfo.netmask }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.netInfo {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px;
}
</style>
