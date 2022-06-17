<template>

  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="项目名称" prop="pname">
      <el-input v-model="ruleForm.pname" />
    </el-form-item>

    <el-form-item label="项目地点" prop="location">
      <el-input v-model="ruleForm.location" />
    </el-form-item>
    <el-form-item label="服务对象" prop="serviceObject">
      <el-input v-model="ruleForm.serviceObject" />
    </el-form-item>
    <el-form-item label="志愿者保障" prop="volunteerUpport">
      <el-input v-model="ruleForm.volunteerUpport" />
    </el-form-item>
    <el-form-item label="服务时间描述" prop="serviceDescription">
      <el-input v-model="ruleForm.serviceDescription" type="textarea" />
    </el-form-item>
    
    <el-form-item label="招募日期" required>
      <el-col :span="11">
        <el-form-item prop="recruitDate">
          <el-date-picker
            v-model="ruleForm.recruitDate"
            type="date"
            label="选择日期"
            placeholder="选择日期"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
      <el-col class="text-center" :span="2">
        <span class="text-gray-500" style="margin-left:5px">项目日期</span>
      </el-col>
      <el-col :span="11">
        <el-form-item prop="projectDate">
          <el-date-picker
            type="date"
            v-model="ruleForm.projectDate"
            label="选择日期"
            placeholder="选择日期"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
    </el-form-item>

    <el-form-item label="岗位名称" prop="postName">
      <el-input v-model="ruleForm.postName" />
    </el-form-item>
     <el-form-item label="岗位条件" prop="postCondition">
      <el-input v-model="ruleForm.postCondition" />
    </el-form-item>
    <el-form-item label="岗位描述" prop="postDesc">
      <el-input v-model="ruleForm.postDesc" type="textarea" />
    </el-form-item>
    <el-form-item label="岗位计划招募数" prop="targetNum">
      <el-select-v2
        v-model="ruleForm.targetNum"
        placeholder="选择人数"
        :options="options"
        v-on:change="fun(ruleForm.targetNum)"
      />
    </el-form-item>


    <el-form-item label="服务类别" prop="type">
      <el-radio-group v-model="ruleForm.type">
        <el-radio label="Online activities" value="Online activities" name="type" />
        <el-radio label="Promotion activities" value="Promotion activities" name="type" />
        <el-radio label="Offline activities" value="Offline activities" name="type" />
        <el-radio label="Simple brand exposure" value="Simple brand exposure" name="type" />
      </el-radio-group>
    </el-form-item>

    <el-form-item label="项目详情" prop="projectDetails">
      <el-input v-model="ruleForm.projectDetails" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >提交</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import {datasubmit} from  '../../api/volunteer';

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
 pname:'',
  location:'',
  releaseDate:'',
  projectDate:'',
  recruitDate:'',
  serviceObject:'',
  volunteerUpport:'',
  serviceDescription:'',
  projectDetails:'',
  postDesc:'',
  postCondition:'',
  postName:'',
  targetNum:'',
  type: '',
})

const fun = (count) =>{
console.log(count)
}
const rules = reactive<FormRules>({
postDesc: [
    { required: true, message: '请输入岗位描述', trigger: 'blur' },
  ],
  postCondition: [
    { required: true, message: '请输入岗位条件', trigger: 'blur' },
  ],
  postName: [
    { required: true, message: '请输入岗位名称', trigger: 'blur' },
  ],
  targetNum: [
    { required: true, message: '请输入岗位计划招募数', trigger: 'blur' },
  ],

releaseDate: [
    { required: true, message: '请输入发布日期', trigger: 'blur' },
  ],
  recruitDate: [
    { required: true, message: '请输入招募日期', trigger: 'blur' },
  ],
  projectDate: [
    { required: true, message: '请输入项目日期', trigger: 'blur' },
  ],
  serviceObject: [
    { required: true, message: '请输入服务对象', trigger: 'blur' },
  ],
  volunteerUpport: [
    { required: true, message: '请输入志愿者保障', trigger: 'blur' },
  ],
  serviceDescription: [
    { required: true, message: '请输入服务时间描述', trigger: 'blur' },
  ],
projectDetails: [
    { required: true, message: '请输入项目详情', trigger: 'blur' },
  ],
pname: [
    { required: true, message: '请输入项目名称', trigger: 'blur' },
  ],
  location: [
    { required: true, message: '请输入项目地点', trigger: 'blur' },
  ],
  // name: [
  //   { required: true, message: 'Please input Activity name', trigger: 'blur' },
  //   { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  // ],
  type: [
    {
      required: true,
      message: '请选择一个服务类别',
      trigger: 'change',
    },
  ],
})
const props = defineProps({
  callback: Function
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
    datasubmit(1, ruleForm.pname, ruleForm.location, ruleForm.releaseDate, ruleForm.projectDate, ruleForm.recruitDate, ruleForm.serviceObject,
    ruleForm.volunteerUpport, ruleForm.serviceDescription, ruleForm.projectDetails, ruleForm.postDesc, ruleForm.postCondition, ruleForm.postName, ruleForm.targetNum, ruleForm.type)
    .then(res =>{
      alert("提交成功")
      emits("callback")
    })
    Object.keys(ruleForm).map(key => {
    delete ruleForm[key]
    formEl.resetFields()
    }) 
    } else {
      console.log('error submit!', fields)
      alert("请完善相关信息")
    }
  })
}

const emits = defineEmits(['update:ruleForm','callback'])
 
//关闭的点击事件
  // const handleClose = () => {
  // console.log(1111111);
  // // emit("searchdata",123);
  // emits('update:ruleForm', false)

  // }

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))



</script>
