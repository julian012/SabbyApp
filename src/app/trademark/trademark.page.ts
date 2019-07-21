import {Component, OnInit} from '@angular/core';
import {ActionSheetController, AlertController} from '@ionic/angular';
import {LoadingController} from '@ionic/angular';
import {TrademarkModel} from '../models/Trademark.model';
import {TrademarkService} from './trademark.service';

@Component({
    selector: 'app-trademark',
    templateUrl: './trademark.page.html',
    styleUrls: ['./trademark.page.scss']
})
export class TrademarkPage implements OnInit {

    public MESSAGE_TRADEMARK_EXIST = 'La marca no se pudo agregar, debido a que el nombre ingresado ya existe.';
    public MESSAGE_TRADEMARK_CONN = 'La marca no se pudo agregar por un problema de conexión.';
    public MESSAGE_TRADEMARK_ADDED = 'Marca agregada correctamente';
    public dataTrademark: TrademarkModel[] = [];

    constructor(private trademarkService: TrademarkService,
                public alertCtrl: AlertController,
                public loadingController: LoadingController,
                private actionSheetCtrl: ActionSheetController) {
    }

    ngOnInit() {
        this.loadTrademark();
    }

    public loadTrademark(): void {
        this.dataTrademark = this.trademarkService.getTrademarks();
    }

    public createTrademark(data: string): void {
        const trademark = new TrademarkModel();
        trademark.name_trademark = data;
        trademark.id_trademark = -1;
        if (this.dataTrademark.find(x => x.name_trademark.toUpperCase() === data.toUpperCase())) {
            this.showMessage('Mensaje', 'Agregar marca', this.MESSAGE_TRADEMARK_EXIST);
        } else {
            this.trademarkService.createTrademark(trademark).subscribe(res => {
                console.log(res);
                this.loadTrademark();
                this.showMessage('Mensaje', 'Agregar marca', this.MESSAGE_TRADEMARK_ADDED);
            }, (error) => {
                this.showMessage('Mensaje', 'Agregar marca', this.MESSAGE_TRADEMARK_CONN);
            });
        }
    }

    async saveTrademarkLoading() {
        const loading = await this.loadingController.create({
            message: 'Procesando',
            duration: 2000
        });
        await loading.present();
    }

    async showPrompt() {
        const prompt = await this.alertCtrl.create({
            header: 'Agregar Marca',
            message: 'Ingrese el nombre de la marca que desea agregrar',
            inputs: [
                {
                    name: 'title',
                    placeholder: 'Nombre'
                },
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Guardar',
                    handler: data => {
                        this.createTrademark(data.title);
                        this.saveTrademarkLoading();

                    }
                }
            ]
        });
        await prompt.present();
    }

    async changeTrademarkName(trademark: TrademarkModel) {
        const prompt = await this.alertCtrl.create({
            header: 'Modificar Marca',
            message: 'Ingrese el nombre de la marca. Tenga en cuenta que si el nombre cambia,' +
                ' se va a ver reflejado tambien en los reportes',
            inputs: [
                {
                    name: 'title',
                    placeholder: trademark.name_trademark
                },
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Modificar',
                    handler: data => {
                        this.saveTrademark(trademark, data.title);
                    }
                }
            ]
        });
        await prompt.present();
    }

    saveTrademark(trademark: TrademarkModel, title: string) {
        if (this.dataTrademark.find(x => x.name_trademark.toUpperCase() === title.toUpperCase())) {
            this.showMessage('Mensaje', 'Modificar marca', this.MESSAGE_TRADEMARK_EXIST);
        } else {
            trademark.name_trademark = title;
            this.trademarkService.updateTrademark(trademark).subscribe((res) => {
                this.saveTrademarkLoading();
                this.showMessage('Mensaje', 'Modificar marca', 'Nombre de la marca modificada correctamente');
            }, (error) => {
                this.saveTrademarkLoading();
                this.showMessage('Mensaje', 'Modificar marca', 'Nombre de la marca ' +
                    'no se pudo modificar. Error en la conexión.');
            });
        }
    }

    async showMessage(messageHeader, messageSubHeader, messageDialog) {
        const alert = await this.alertCtrl.create({
            header: 'Mensaje',
            subHeader: 'Agregando marca',
            message: messageDialog,
            buttons: ['OK']
        });
        await alert.present();
    }

    // public generatePathAlternative(name : string){
    //     console.log("https://ui-avatars.com/api/?name=" + name);
    //     return "https://ui-avatars.com/api/?name=" + name ;
    // }
    //
    async deleteTrademark(trademark: TrademarkModel) {
        const alert = await this.alertCtrl.create({
            header: 'Confirmación',
            message: `¿Seguro desea eliminar la marca ${trademark.name_trademark}?`,
            cssClass: 'options-as-platforms',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                }, {
                    text: 'Continuar',
                    handler: () => {
                        this.trademarkService.deleteTrademark(trademark).subscribe(res => {
                            this.loadTrademark();
                            this.showMessage('Mensaje', 'Eliminando marca', 'Marca eliminada correctamente');
                            this.saveTrademarkLoading();
                        }, (error) => {
                            this.showMessage('Error', 'Eliminando marca',
                                'No se puede eliminar la marca, por un problema en la conexión.');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }

    async optionsInTrademarks(trademark: TrademarkModel) {
        const actionSheet = await this.actionSheetCtrl.create({
            header: trademark.name_trademark,
            buttons: [{
                text: 'Eliminar',
                icon: 'close-circle',
                cssClass: 'danger',
                handler: () => {
                    this.deleteTrademark(trademark);
                }
            }, {
                text: 'Cambiar nombre',
                icon: 'build',
                handler: () => {
                    this.changeTrademarkName(trademark);
                }
            }, {
                text: 'Cancelar',
                role: 'cancel'
            }
            ]
        });
        await actionSheet.present();
    }
}
