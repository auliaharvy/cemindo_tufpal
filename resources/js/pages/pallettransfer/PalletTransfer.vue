<template>
    <div class="col-md-12">
        <div class="panel">
            <div class="panel-heading">
                <router-link v-if="$can('create pallettransfers')" :to="{ name: 'pallettransfers.add' }"><v-btn>Add Pallet Transfer</v-btn></router-link>
            </div>
            <v-spacer />

            <div class="panel-body">

                <!-- TABLE UNTUK MENAMPILKAN LIST SJP -->
                <template>
                    <v-dialog
                    v-model="scanner"
                    max-width="500"
                    >
                    <qrcode-stream @decode="onDecode"></qrcode-stream>
                    </v-dialog>
                    <v-card>
                        <v-card-title>
                            Pallet Transfer
                            <v-spacer></v-spacer>
                            <v-btn color="success" small @click="isScanning()">Scan QR</v-btn>
                            <v-spacer></v-spacer>
                            <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                            ></v-text-field>
                        </v-card-title>
                        <v-data-table
                        :loading="loading"
                        :headers="headers"
                        :items="pallettransfers.data"
                        :search="search"
                        dense
                        >
                            <template v-slot:item.status="{ item }">
                                <!-- <v-chip class="label label-default" v-if="item.status == 0">SENDING</v-chip>
                                <v-chip class="label label-primary" v-if="item.status == 1">RECEIVED</v-chip> -->
                                <!-- <span class="label label-primary" v-if="item.status == 0">SENDING</span>
                                <span class="label label-success" v-else-if="item.status == 1">RECEIVED</span> -->
                                <p v-if="item.status == 0">SENDING</p>
                                <p class="text-blue" v-if="item.status == 1">RECEIVED</p>
                            </template>

                            <template v-if="$can('update pallettransfers')" v-slot:item.receive="{ item }">
                                <router-link :to="{ name: 'pallettransfers.edit', params: {id: item.pallet_transfer_id} }" v-if="item.status == 0 && authenticated.reference_pool_pallet_id == item.destination" >
                                    <v-btn color="success" small>Receive</v-btn>
                                </router-link>
                            </template>

                            <template v-slot:item.delete="{ item }">
                                <v-btn v-if="$can('delete pallettransfers')" color="error" small @click="deletePalletTransfer(item.pallet_transfer_id)">Delete</v-btn>
                            </template>

                            <template v-slot:item.view="{ item }">
                            <router-link :to="{ name: 'pallettransfers.view', params: {id: item.pallet_transfer_id} }" >
                                <v-btn color="success" small>View</v-btn>
                            </router-link>
                        </template>
                        </v-data-table>
                    </v-card>
                </template>

            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'DataPalletTransfer',
    created() {
        this.getPalletTransfer() //LOAD DATA SJP KETIKA COMPONENT DI-LOAD
    },
    data() {
        return {
            scanner: false,
            //FIELD YANG AKAN DITAMPILKAN PADA TABLE DIATAS
            headers: [
                // { value: 'dep_pool', text: 'Departure Pool' },
                // { value: 'dest_pool', text: 'Destination Pool' },
                // { value: 'sender_name', text: 'Sender User' },
                // { value: 'receiver_name', text: 'Receiver User' },
                { value: 'tp_number', text: 'TP Number' },
                { value: 'status', text: 'Status' },
                // { value: 'good_pallet', text: 'Good Pallet' },
                // { value: 'tbr_pallet', text: 'TBR Pallet' },
                // { value: 'transporter_name', text: 'Transporter Name' },
                { value: 'vehicle_number', text: 'Vehicle Number' },
                // { value: 'driver_name', text: 'Driver Name' },
                { value: 'reason', text: 'Reason' },
                { value: 'note', text: 'Note' },
                { value: 'view', text: 'View' },
                { value: 'receive', text: 'Receive'},
                { value: 'delete', text: 'Delete'},
            ],
            search: '',
        }
    },
    computed: {
        ...mapState('pallettransfer', {
            pallettransfers: state => state.pallettransfers //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
        }),
        ...mapState('pallettransfer', {
            loading: state => state.loading //LOAD DATA CUSTOMER DARI STATE CUSTOMER
        }),
        ...mapState('user', {
            authenticated: state => state.authenticated
        }),
        //MENGAMBIL DATA PAGE DARI STATE CUSTOMER
        page: {
            get() {
                return this.$store.state.pallettransfer.page
            },
            set(val) {
                this.$store.commit('pallettransfer/SET_PAGE', val)
            }
        }
    },
    watch: {
        page() {
            this.getPalletTransfer() //KETIKA VALUE PAGE TERJADI PERUBAHAN, MAKA REQUEST DATA BARU
        },
        search() {
            this.getPalletTransfer(this.search) //KETIKA VALUE SEARCH TERJADI PERUBAHAN, MAKA REQUEST DATA BARU
        }
    },
    methods: {
        isScanning(){
            this.scanner = true
        },
        onDecode (decodedString) {
          console.log(decodedString)
          this.search = decodedString
          this.scanner = false
        },
        ...mapActions('pallettransfer', ['getPalletTransfer', 'removePalletTransfer']),
        //KETIKA TOMBOL HAPUS DITEKAN MAKA FUNGSI INI AKAN DIJALANKAN
        deletePalletTransfer(id) {
            this.$swal({
                title: 'Are you sure?',
                text: "This will delete record Permanently!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            }).then((result) => {
                if (result.value) {
                    this.removePalletTransfer(id) //JIKA SETUJU MAKA PERMINTAAN HAPUS AKAN DI EKSEKUSI
                }
            })
        }
    }
}
</script>
