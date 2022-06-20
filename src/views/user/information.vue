<template>
  <div>
    <el-form id="formInline" style="text-align: center;">
      <el-form
        :inline="true"
        :label-position="labelPosition"
        label-width="100px"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="队伍名称">
          <el-input
            style="width: 300px"
            v-model="teamInformation.list.teamName"
            placeholder="队伍名称"
            readonly="true"
          />
        </el-form-item>
        <el-form-item label="队伍编号">
          <el-input
            style="width: 300px"
            v-model="teamInformation.list.teamid"
            placeholder="队伍编号"
            readonly="true"
          />
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        :label-position="labelPosition"
        label-width="100px"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="联系人*">
          <el-input
            style="width: 300px"
            v-model="teamInformation.list.contact"
            placeholder="联系人"
          />
        </el-form-item>
        <el-form-item label="手机号*">
          <el-input
            style="width: 300px"
            v-model="teamInformation.list.telephone"
            placeholder="手机号"
          />
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        :label-position="labelPosition"
        label-width="100px"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="地址">
          <el-input
            style="width: 300px"
            v-model="teamInformation.list.address"
            placeholder="1"
            readonly="true"
          />
        </el-form-item>
        <el-form-item label="详细地址*">
          <el-input
            style="width: 300px"
            v-model="teamInformation.list.detailedAddress"
            placeholder="Approved by"
          />
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        :label-position="labelPosition"
        label-width="100px"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="登记部门">
          <el-input
            style="width: 300px"
            v-model="teamInformation.list.regisDepartment"
            placeholder="Approved by"
            readonly="true"
          />
        </el-form-item>
        <el-form-item label="登记机关">
          <el-input
            style="width: 300px"
            v-model="teamInformation.list.registrationAuthority"
            placeholder="Approved by"
            readonly="true"
          />
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        :label-position="labelPosition"
        label-width="100px"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="成立日期">
          <div class="block">
            <el-date-picker
              style="width: 300px"
              v-model="teamInformation.list.registerDate"
              type="date"
              placeholder="选择日期"
              readonly="true"
            />
          </div>
        </el-form-item>
        <el-form-item label="联络组织">
          <el-input
            style="width: 300px"
            v-model="teamInformation.list.liaisonOrganization"
            placeholder="Approved by"
            readonly="true"
          />
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        :label-position="labelPosition"
        label-width="100px"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="队伍简介*">
          <el-input
            style="width: 730px"
            v-model="teamInformation.list.teamProfile"
            :rows="6"
            type="textarea"
            placeholder="请输入队伍简介"
          />
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        :label-position="labelPosition"
        label-width="100px"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="onSubmit">提交修改</el-button>
        </el-form-item>
      </el-form>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, onBeforeMount } from "vue";
import { getTeamInformation,UpdateSubmit } from "@/api/team";
import { getTeamid} from '@/utils/accessToken';
const value1 = ref("");
const textarea = ref("");
const formInline = reactive({
  user: "",
  message: "hello",
  region: ""
});
const teamInformation = reactive({
  list: [
    {
      teamName: "",
      teamid: getTeamid(),
      contact: "",
      telephone: "",
      address: "",
      detailedAddress: "",
      regisDepartment: "",
      registrationAuthority: "",
      registerDate: "",
      liaisonOrganization: "",
      teamProfile: ""
    }
  ]
});
onMounted(() => {
  getTeamInformation(getTeamid()).then((res) => {
    console.log(res.data);
    teamInformation.list = res.data;
    console.log(teamInformation);
  }).catch(err =>{
    console.err(err)
  });
});
const labelPosition = ref("left");
const onSubmit = () => {
  const teamid = teamInformation.list.teamid;
  const contact = teamInformation.list.contact;
  const telephone = teamInformation.list.telephone;
  const detailedAddress = teamInformation.list.detailedAddress;
  const teamProfile = teamInformation.list.teamProfile;
  UpdateSubmit(teamid,contact,telephone,detailedAddress,teamProfile).then((res) =>{
    alert("修改成功");
    location.reload();
  })
};
const url = "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";
</script>