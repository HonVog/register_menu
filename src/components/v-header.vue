<template>
    <div class="v-header">
        <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
                <el-menu-item index="">Processing Center</el-menu-item>
                <el-menu-item index=""><a href="" target="">Orders</a></el-menu-item>

        </el-menu>
    </div>
</template>

<script>

export default({
    name: "v-header"
})
</script>
