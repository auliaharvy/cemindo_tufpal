<template>
    <div>
        <!-- <div class="form-group">
            <label>Pool Pallet</label>
            <select class='form-control' v-model='bermissing.pool_pallet_id'>
                <option value='0' >Select Pool Pallet</option>
                <option v-for='data in pools.data' :value='data.pool_pallet_id'>{{ data.pool_name }}</option>
            </select>
        </div> -->
        <!-- <div class="form-group">
            <label>Transporter Name</label>
            <select class='form-control' v-model='bermissing.transporter_id'>
                <option value='0' >Select Transporter</option>
                <option v-for='data in transporters.data' :value='data.transporter_id'>{{ data.transporter_name }}</option>
            </select>
        </div> -->
       <!-- <div class="form-group" :class="{ 'has-error': errors.reporter_user_id }">
            <label for="">Reporter User</label>
            <input type="text" class="form-control" v-model="bermissing.reporter_user_id" :readonly="$route.name == 'bermissing.edit'">
            <p class="text-danger" v-if="errors.reporter_user_id">{{ errors.reporter_user_id[0] }}</p>
        </div> -->
        <!-- <div class="form-group">
            <label>Reporter User</label>
            <select class='form-control' v-model='bermissing.reporter_user_id' :readonly="$route.name == 'bermissings.edit'">
                <option v-for='data in authenticated' :value='authenticated.id'>{{ authenticated.name }}</option>
            </select>
        </div> -->
        <!-- <div class="form-group" :class="{ 'has-error': errors.approver_user_id }">
            <label for="">Approver User</label>
            <input type="text" class="form-control" v-model="bermissing.approver_user_id" :readonly="$route.name == 'bermissing.add'">
            <p class="text-danger" v-if="errors.approver_user_id">{{ errors.approver_user_id[0] }}</p>
        </div> -->
        <!-- <div class="form-group">
            <label>Reporter User</label>
            <select class='form-control' v-model='bermissing.approver_user_id' :readonly="$route.name == 'bermissings.add'">
                <option v-for='data in authenticated' :value='authenticated.id'>{{ authenticated.name }}</option>
            </select>
        </div> -->

        <v-layout row wrap class="px-5">
            <v-flex class="px-5" xs12 md6 lg6>
                <div class="form-group">
                    <label>Pool Pallet</label>
                    <v-autocomplete
                    :items="pools.data"
                    dense
                    solo
                    v-model="bermissing.pool_pallet_id"
                    item-text="pool_name"
                    item-value="pool_pallet_id"
                    clearable
                    >
                    </v-autocomplete>
                    <!-- <select class='form-control' v-model='bermissing.pool_pallet_id'>
                        <option value='0' >Select Pool Pallet</option>
                        <option v-for='data in pools.data' v-bind:key='data.pool_pallet_id' :value='data.pool_pallet_id'>{{ data.pool_name }}</option>
                    </select> -->
                </div>
            </v-flex>
            <v-flex class="px-5" xs12 md6 lg6>
                <div class="form-group">
                    <label>Transporter</label>
                    <v-autocomplete
                    :items="transporters.data"
                    dense
                    solo
                    v-model="bermissing.transporter_id"
                    item-text="transporter_name"
                    item-value="transporter_id"
                    clearable
                    >
                    </v-autocomplete>
                    <!-- <select class='form-control' v-model='bermissing.transporter_id'>
                        <option value='0' >Select Transporter</option>
                        <option v-for='data in transporters.data' v-bind:key='data.transporter_id' :value='data.transporter_id'>{{ data.transporter_name }}</option>
                    </select> -->
                </div>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="px-5">
            <v-flex class="px-5" xs12 md6 lg6>
                <div class="form-group" :class="{ 'has-error': errors.ber_pallet }">
                    <label for="">BER Pallet</label>
                    <input type="text" class="form-control" v-model="bermissing.ber_pallet">
                    <p class="text-danger" v-if="errors.ber_pallet">{{ errors.ber_pallet[0] }}</p>
                </div>
            </v-flex>
            <v-flex class="px-5" xs12 md6 lg6>
                <div class="form-group" :class="{ 'has-error': errors.missing_pallet }">
                    <label for="">Missing Pallet</label>
                    <input type="text" class="form-control" v-model="bermissing.missing_pallet">
                    <p class="text-danger" v-if="errors.missing_pallet">{{ errors.missing_pallet[0] }}</p>
                </div>
            </v-flex>
        </v-layout>

        <v-layout row wrap class="px-5">
            <v-flex class="px-5" xs12 md12 lg12>
                <div class="form-group" :class="{ 'has-error': errors.reporter_prove }">
                    <label for="">Prove</label>
                    <input type="file" class="form-control" accept="image/*" @change="uploadImage($event)" id="file-input">
                    <p class="text-black">Leave blank if you don't want to change photo</p>
                    <p class="text-danger" v-if="errors.photo">{{ errors.reporter_prove[0] }}</p>
                </div>
            </v-flex>
            <v-flex class="px-5" xs12 md12 lg12>
                <div class="form-group" :class="{ 'has-error': errors.note }">
                    <label for="">Note</label>
                    <input type="text" class="form-control" v-model="bermissing.note">
                    <p class="text-danger" v-if="errors.note">{{ errors.note[0] }}</p>
                </div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
    name: 'FormBermissing',
    created() {
      this.getPools(),
      this.getTransporters(),
      this.getUserLogin()
    },
    data() {
        return {
            bermissing: {
                pool_pallet_id: '',
                transporter_id: '',
                ber_pallet: 0,
                missing_pallet: 0,
                reporter_prove: '',
                note: '',
            }
        }
    },

    computed: {
        ...mapState(['errors']),
        ...mapState('pool', {
            pools: state => state.pools
        }),
         ...mapState('transporter', {
            transporters: state => state.transporters
        }),
        ...mapState('user', {
            authenticated: state => state.authenticated
        }),
    },
    methods: {
        ...mapMutations('bermissing', ['CLEAR_FORM']),
        ...mapActions('bermissing', ['submitBermissing']),
        ...mapActions('pool', ['getPools']),
        ...mapActions('vehicle', ['getVehicles']),
        ...mapActions('driver', ['getDrivers']),
        ...mapActions('transporter', ['getTransporters']),
        ...mapActions('user', ['getUserLogin']),
       uploadImage(event) {
            this.bermissing.reporter_prove = event.target.files[0]
        },
        submit() {
            console.log(this.bermissing.pool_pallet_id)
            let form = new FormData()
            form.append('pool_pallet_id', this.bermissing.pool_pallet_id)
            form.append('transporter_id', this.bermissing.transporter_id)
            form.append('ber_pallet', this.bermissing.ber_pallet)
            form.append('missing_pallet', this.bermissing.missing_pallet)
            form.append('reporter_prove', this.bermissing.reporter_prove)
            form.append('note', this.bermissing.note)
                this.submitBermissing(form).then(() => {
                    this.bermissing = {
                        pool_pallet_id: '',
                        transporter_id: '',
                        ber_pallet: '',
                        missing_pallet: '',
                        reporter_prove: '',
                        note: '',
                    }
                    this.$router.push({ name: 'bermissings.data' })
                })
        }
    },

    destroyed() {
        this.CLEAR_FORM() //KETIKA COMPONENT DITINGGALKAN, BERSIHKAN DATA
    }
}
</script>
