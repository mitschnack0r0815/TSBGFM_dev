export class Preloader extends Phaser.Scene
{
    constructor()
    {
        super({
            key: 'Preloader'
        });
    }

    preload() 
    {
        this.load.image('panel_brown', 'assets/panel_brown_arrows_detail_200x100.png');
        this.load.image('star', 'assets/minimap_icon_star_yellow.png');
        this.load.image('start_banner', 'assets/banner_classic_curtain.png');
        this.load.image('knight', 'assets/more/knight.png');
    }

    create ()
    {
        this.scene.start("Start");
    }
}