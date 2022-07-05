<template>

    <div>
        <BodyMassIndex v-if="false" />
        <RegistrationForm />
    </div>

</template>

<script>
import BodyMassIndex from './views/BodyMassIndex';
import RegistrationForm from './views/RegistrationForm';

export default {
    components: {
        BodyMassIndex,
        RegistrationForm,
    }
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

input[type="number"], input[type="text"], input[type="email"], input[type="password"], textarea {
    @apply px-3 py-1 shadow rounded-md border border-gray-500
}
</style>
