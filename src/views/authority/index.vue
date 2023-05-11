<script setup lang="ts">
import { onMounted, ref } from "vue";
import { addCert, listCerts } from "@/api/authority";
import {
  genFileId,
  UploadInstance,
  UploadProps,
  UploadRawFile
} from "element-plus";

const loading = ref(false);
const certlist = ref<CertInfo[]>([]);

const getCerts = async () => {
  loading.value = true;
  try {
    const { data } = await listCerts();
    certlist.value = data.list;
  } catch (e) {
    console.log(e);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
};

onMounted(() => {
  getCerts();
});

const upload = ref<UploadInstance>();

const handleExceed: UploadProps["onExceed"] = files => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const files = ref<Array<File>>([]);
const submitUpload = () => {
  addCert(files.value);
};

const httprequest = ({ file }) => {
  console.log("add file", file);
  files.value.push(file);
  // addCert(file);
};
</script>

<template>
  <div>
    <h3>this is authority page</h3>
    <el-upload
      ref="upload"
      class="upload-demo"
      action="/authority/addCert"
      :limit="1"
      :on-exceed="handleExceed"
      :auto-upload="true"
      :http-request="httprequest"
    >
      <template #trigger>
        <el-button type="primary">select file</el-button>
      </template>
    </el-upload>

    <el-upload
      ref="upload"
      class="upload-demo"
      action="/authority/addCert"
      :limit="1"
      :on-exceed="handleExceed"
      :auto-upload="true"
      :http-request="httprequest"
    >
      <template #trigger>
        <el-button type="primary">select file 2</el-button>
      </template>
      <!--      <el-button class="ml-3" type="success" @click="submitUpload">
              upload to server
            </el-button>-->
    </el-upload>
    <el-button class="ml-3" type="success" @click="submitUpload">
      upload to server
    </el-button>
    <div v-loading="loading">
      {{ certlist }}
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
