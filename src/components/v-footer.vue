<template>
    <div class="v-footer">
        <footer>
             <Breadcrumb separator="/">
                <Breadcrumb.Item>Homepage</Breadcrumb.Item>
                <Breadcrumb.Item>Promotion Management</Breadcrumb.Item>
                <Breadcrumb.Item>Promotion List</Breadcrumb.Item>
                <Breadcrumb.Item>Promotion Detail</Breadcrumb.Item>
            </Breadcrumb>
        </footer>
    </div>
</template>

<script>


export default {
    name: "v-footer",
}
</script>

<style scoped>
.v-footer{
    margin: 0 2%;
    padding: 10px;
    color: aliceblue;
    background-color: #315467;
    position: fixed; 
    left: 0;
    bottom: 0;
    padding: 10px; 
    width: 100%;
}

.v-footer footer{
    margin: 0 2%;
    padding: 10px;
}

</style>
