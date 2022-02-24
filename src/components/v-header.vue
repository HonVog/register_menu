<template>
    <div class="v-header">
        <el-menu
            class="el-menu-demo"
            mode="horizontal"
            background-color="#315467"
            text-color="#fff"
            active-text-color="#ffd04b">
                <el-menu-item index="">Главная страница</el-menu-item>
                <el-menu-item index=""><a href="" target="">Что-то из сайта</a></el-menu-item>
        </el-menu>
    </div>
</template>

<script>

export default({
    name: "v-header"
})
</script>

<style scoped>
.v-header{
    margin: 0 20px;
    border-radius: 1px;
}
</style>
