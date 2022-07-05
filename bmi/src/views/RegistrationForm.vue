<template>

    <div class="font-sans p-8 space-y-8">

        <h1 class="text-3xl font-bold">
            {{ localizedText.registration }}
        </h1>

        <div class="flex">
            <div v-for="l in availableLocales.filter(l => l !== locale)"
                 :key="l"
                 :class="{ 'text-blue-500 font-semibold': l === locale }"
                 @click="locale = l"
                 class="px-2 cursor-pointer">
                <img :src="`https://countryflagsapi.com/png/${l}`" class="h-3">
            </div>
        </div>

        <div class="relative border border-gray-500 shadow p-6 rounded-md space-y-6">

            <BoxHeader>
                {{ localizedText.loginDetails }}
            </BoxHeader>

            <div class="flex flex-col space-y-4">

                <FormField>
                    <template #title>{{ localizedText.username }}</template>
                    <input v-model="input.username" type="text" placeholder="John Doe" autofocus>
                    <template #error v-if="'username' in errors">{{ errors.username }}</template>
                </FormField>

                <FormField>
                    <template #title>{{ localizedText.password }}</template>
                    <input v-model="input.password" type="password" placeholder="********">
                    <template #error v-if="'password' in errors">{{ errors.password }}</template>
                </FormField>

                <FormField>
                    <template #title>{{ localizedText.passwordConfirmation }}</template>
                    <input ref="passwordConfirmation"
                           v-model="input.passwordConfirmation"
                           type="password"
                           placeholder="********"
                           :class="{
                                'bg-green-200': validation.passwordConfirmation === 1,
                                'bg-red-200': validation.passwordConfirmation === -1,
                            }">
                    <template #error v-if="'passwordConfirmation' in errors">{{ errors.passwordConfirmation }}</template>
                </FormField>

            </div>

        </div>

        <div class="relative border border-gray-500 shadow p-6 rounded-md space-y-6">

            <BoxHeader>
                {{ localizedText.userData }}
            </BoxHeader>

            <div class="flex flex-col space-y-4">

                <FormField>
                    <template #title>{{ localizedText.firstName }}</template>
                    <input v-model="input.firstName" type="text" placeholder="John">
                    <template #error v-if="'firstName' in errors">{{ errors.firstName }}</template>
                </FormField>

                <FormField>
                    <template #title>{{ localizedText.middleName }}</template>
                    <input v-model="input.middleName" type="text" placeholder="Pirate">
                    <template #error v-if="'middleName' in errors">{{ errors.middleName }}</template>
                </FormField>

                <FormField>
                    <template #title>{{ localizedText.lastName }}</template>
                    <input v-model="input.lastName" type="text" placeholder="Doe">
                    <template #error v-if="'lastName' in errors">{{ errors.lastName }}</template>
                </FormField>

                <FormField>
                    <template #title>{{ localizedText.mail }}</template>
                    <input ref="mail"
                           v-model="input.mail"
                           type="text"
                           placeholder="john@example.com"
                           :class="{
                                'bg-green-200': validation.mail === 1,
                                'bg-red-200': validation.mail === -1,
                            }">
                    <template #error v-if="'mail' in errors">{{ errors.mail }}</template>
                </FormField>

            </div>

        </div>

        <div class="flex justify-end space-x-4">
            <button @click="submit"
                    class="px-4 py-1 leading-normal shadow rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-160">
                Submit
            </button>
        </div>

    </div>

</template>

<script>
import BoxHeader from '../components/BoxHeader';
import FormField from '../components/FormField';

export default {

    components: {
        BoxHeader,
        FormField
    },

    data: () => ({
        input: {
            username: null,
            password: null,
            passwordConfirmation: null,
            firstName: null,
            middleName: null,
            lastName: null,
            mail: null
        },
        locales: {
            us: {
                registration: 'Registration',
                loginDetails: 'Login Details',
                userData: 'User Data',
                username: 'User Name',
                password: 'Password',
                passwordConfirmation: 'Password Confirmation',
                firstName: 'First name',
                middleName: 'Middle name',
                lastName: 'Last name',
                mail: 'Email'
            },
            de: {
                registration: 'Registrierung',
                loginDetails: 'Anmeldedaten',
                userData: 'Benutzerdaten',
                username: 'Benutzername',
                password: 'Passwort',
                passwordConfirmation: 'Passwort bestätigen',
                firstName: 'Vorname',
                middleName: 'Zweitname',
                lastName: 'Nachname',
                mail: 'E-Mail'
            }
        },
        locale: 'us',
        errors: {},
        validation: {
            passwordConfirmation: 0,
            mail: 0
        }
    }),

    computed: {
        localizedText() {
            return this.locales[this.locale];
        },
        availableLocales() {
            return Object.keys(this.locales);
        }
    },

    mounted() {
        this.$refs.passwordConfirmation.addEventListener('focusout', () => this.validation.passwordConfirmation = this.validatePasswordConfirmation());
        this.$refs.mail.addEventListener('focusout', () => this.validation.mail = this.validateMail());
    },

    methods: {
        validatePasswordConfirmation() {
            if (!this.input.password || !this.input.passwordConfirmation) {
                return -1;
            }

            if (this.input.password === this.input.passwordConfirmation) {
                return 1;
            }

            return -1;
        },
        validateMail() {
            if (!this.mail) {
                return -1;
            }

            return this.input.mail.matches(/^[a-z][a-z0-9]{1,}@[a-z]{2,}\.[a-z]{2,3}/) ? 1 : -1;
        },
        submit() {
            const data = this.input;

            this.errors = {};

            if (!data.username) {
                this.errors.username = 'Missing';
                return false;
            }

            if (!data.password) {
                this.errors.password = 'Missing';
                return;
            }

            if (data.password !== data.passwordConfirmation) {
                this.errors.passwordConfirmation = 'Not matching';
                return;
            }

            return true;
        }
    }
};
</script>
