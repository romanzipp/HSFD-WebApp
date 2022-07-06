<template>

    <div class="font-sans p-8 space-y-8">

        <h1 class="text-3xl font-bold">
            BMI Rechner
        </h1>

        <div class="relative border border-gray-500 shadow p-6 rounded-md space-y-6">

            <BoxHeader>
                Angaben zur BMI Berechnung
            </BoxHeader>

            <div class="flex flex-col space-y-4">

                <FormField>
                    <template #title>Gewicht</template>
                    <input v-model="weight" type="number" placeholder="Gewicht (kg)" step="1" min="0" max="999" autofocus>
                </FormField>

                <FormField>
                    <template #title>Größe</template>
                    <input v-model="height" type="number" placeholder="Größe (m)" step="0.01" min="0" max="4">
                </FormField>

            </div>

            <div class="relative flex space-x-4 py-6 px-4 border-gray-500 border rounded-md shadow">

                <BoxHeader>
                    Geschlecht
                </BoxHeader>

                <div v-for="g in genders" :key="g.name">
                    <label :for="g.name" class="hover:cursor-pointer">
                        <input v-model="gender" name="gender" type="radio" :id="g.name" :value="g.name">
                        {{ g.title }}
                    </label>
                </div>

            </div>

            <div class="flex flex-col space-y-4">

                <FormField>
                    <template #title>Name</template>
                    <input v-model="name" type="text" placeholder="Max Muster" :class="{ 'border-red-500': 'name' in errors }">
                    <template #error v-if="'name' in errors">{{ errors.name }}</template>
                </FormField>

                <FormField>
                    <template #title>E-Mail</template>
                    <input v-model="mail" type="email" placeholder="foo@bar.com">
                </FormField>

                <FormField>
                    <template #title>Anmerkungen</template>
                    <textarea v-model="comments" rows="4" :class="{ 'border-red-500': 'comments' in errors }"></textarea>
                    <template #error v-if="'comments' in errors">{{ errors.comments }}</template>
                </FormField>
            </div>

            <div class="flex justify-end space-x-4">
                <button @click="submit"
                        class="px-4 py-1 leading-normal shadow rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-160">
                    Absenden
                </button>
                <button @click="reset"
                        class="px-4 py-1 leading-normal shadow rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-160">
                    Zurücksetzen
                </button>
                <button @click="insertXss"
                        class="px-4 py-1 leading-normal shadow rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-160">
                    HACKERMAN
                </button>
                <button @click="submitAjax"
                        class="px-4 py-1 leading-normal shadow rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-160">
                    Absenden via AJAX
                </button>
            </div>

        </div>

        <div v-show="bmi">
            Der BMI beträgt: {{ bmi }}
        </div>

        <div v-show="!!queryString" class="mt-4 border p-2">
            <u>Query String:</u> {{ queryString }}
        </div>

        <div v-show="response" class="mt-4 border p-2">
            <u>Response:</u>
            <span v-html="response"></span>
        </div>
    </div>

</template>

<script>
import BoxHeader from '../components/BoxHeader';
import FormField from '../components/FormField';

// const endpoint = 'https://vulcan.informatik.hs-fulda.de/bmiRechnerAjax.php';
const endpoint = 'http://localhost:8000';

export default {

    components: {
        BoxHeader,
        FormField
    },

    data: () => ({
        weight: 90,
        height: 120,
        gender: null,
        name: 'Foo Bar',
        mail: 'test@example.com',
        comments: 'Foobar',
        genders: [
            { title: 'Männlich', name: 'm' },
            { title: 'Weiblich', name: 'f' },
            { title: 'Divers', name: 'd' }
        ],
        query: null,
        queryString: null,
        errors: {},
        response:null
    }),

    computed: {
        sanitizedHeight() {
            return parseFloat(`${this.height}`.replace(',', '.'));
        },
        bmi() {
            if (!this.weight || !this.sanitizedHeight || !this.gender) {
                return null;
            }

            return Math.round(this.weight / Math.sqrt(this.sanitizedHeight));
        }
    },

    methods: {
        reset() {
            this.weight = this.height = this.gender = this.name = this.mail = null;
        },
        submit(validate = true) {
            const attrs = {
                weight: this.weight,
                height: this.height,
                gender: this.gender,
                name: this.name,
                mail: this.mail,
                comments: this.comments
            };

            if (validate) {
                if (!attrs.name) {
                    this.errors.name = 'Missing';
                    return;
                }

                if (!attrs.name.match(/(?<first>[A-z][a-zöäü-]+) (?<last>[A-z][a-zöäü-]+)/)) {
                    this.errors.name = 'Falsches Format';
                    return;
                }

                if (this.getEscapedContent(attrs.comments) !== attrs.comments) {
                    this.errors.comments = 'Invalider Inhalt';
                    return;
                }
            }

            this.query = new URLSearchParams();
            for (const a in attrs) {
                this.query.append(a, attrs[a]);
            }

            this.errors = {};
            this.queryString = this.query.toString();
        },
        async submitAjax(){
            this.submit(false);

            console.log(this.queryString)

            const query = new URLSearchParams({
                gewicht: this.query.get('weight'),
                groesse: this.query.get('height'),
                name: this.query.get('name'),
                anmerkung: this.query.get('comments'),
            });

            const response = await fetch(`${endpoint}?${query}`);
            this.response = await response.text();
        },
        insertXss() {
            // eslint-disable-next-line no-useless-escape
            this.name = '<script>window.location.href=\'https://google.com\';<\/script>';
        },
        getEscapedContent(content) {
            const div = document.createElement('div');
            div.innerText = content;
            return div.innerHTML;
        }
    }
};
</script>
