<template>

    <div>
        <div class="flex items-center" ref="parent">

            <label :for="id" class="w-1/3 text-right px-4">
                <slot name="title"></slot>
            </label>

            <slot></slot>

        </div>

        <div class="flex">
            <div class="w-1/3"></div>
            <div class="text-red-500 font-medium m-1 text-xs text-center">
                <slot name="error"></slot>
            </div>
        </div>
    </div>

</template>

<script>
export default {

    data: () => ({
        id: null
    }),

    mounted() {
        const input = this.$refs.parent.querySelector('input');
        const id = Math.round(Math.random() * 1000000);

        if (input) {
            input.id = id;
            this.id = id;
        }
    }
};
</script>
