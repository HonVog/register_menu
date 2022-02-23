<template>
    <div class="v-registr">
        <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
            <el-form-item label="Name">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>

            <el-form-item label="Activity zone">
                <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>

            <el-form-item label="Activity form">
                <el-input v-model="formLabelAlign.type"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

export default {
    name: "v-registr",
     data(){
        return{
          labelPosition: 'right',
          formLabelAlign: {
            name: '',
            region: '',
            type: '',     
            },
        }
  },

  props:{},
  components: {},
  methods:{},
}
</script>
