
import { Component, ViewChild } from '@angular/core';

import { App, Events, Nav }     from 'ionic-angular';
import { Subscription }         from 'rxjs/Subscription';

import { LoginComponent }       from '../login/login.component';

import { SocketService }        from '../../services/socket.service';
import { DataframeAccount }     from '../../services/dataframe.account.service';

@Component (
{
    selector    : 'mail'
,   templateUrl : 'mail.component.html'
} )
export class MailComponent
{
    @ViewChild ( Nav ) nav  : Nav;
    title                   : string    = 'mail';

    listof_thing    : any       =
    [
        { name : 'a' }
    ,   { name : 'a' }
    ,   { name : 'a' }
    ];

    current_token           : any;
    token_subscription      : Subscription;

    constructor ( private _app              : App,
                  private _events           : Events,
                  private _socketService    : SocketService,
                  private _dataframeAccount : DataframeAccount )
    {
        console.log ( `::ctor` );
    }

    //
    // Runs when the page has loaded. This event only happens once per page being created.
    // If a page leaves but is cached, then this event will not fire again on a subsequent viewing.
    // The ionViewDidLoad event is good place to put your setup code for the page.
    //
    ionViewDidLoad ( ) : void
    {
        console.log ( `::ionViewDidLoad` );
    }

    //
    // Runs when the page is about to enter and become the active page.
    //
    ionViewWillEnter ( ) : void
    {
        console.log ( `::ionViewWillEnter` );
    }

    //
    // Runs when the page has fully entered and is now the active page.
    // This event will fire, whether it was the first load or a cached page.
    //
    ionViewDidEnter ( ) : void
    {
        console.log ( `::ionViewDidEnter` );

        this.token_subscription = this._dataframeAccount.observe_account_token ( ).subscribe (

            value => { this.current_token = value; }

        );

        this._socketService.engine_init ( );
    }

    //
    // Runs when the page is about to leave and no longer be the active page.
    //
    ionViewWillLeave ( ) : void
    {
        console.log ( `::ionViewWillLeave` );
    }

    //
    // Runs when the page has finished leaving and is no longer the active page.
    //
    ionViewDidLeave ( ) : void
    {
        this.token_subscription.unsubscribe();

        console.log ( `::ionViewDidLeave` );
    }

    //
    // Runs when the page is about to be destroyed and have its elements removed.
    //
    ionViewWillUnload ( ) : void
    {
        console.log ( `::ionViewWillUnload` );
    }

    //
    // Runs before the view can enter. This can be used as a sort of "guard" in authenticated
    // views where you need to check permissions before the view can enter
    //
    ionViewCanEnter ( ) : Promise<boolean>
    {
        console.log ( `::ionViewCanEnter` );

        return new Promise ( ( resolve, reject ) =>
        {
            this._dataframeAccount.is_logged_in ( ).then (

                ( value ) =>
                {
                    console.log ( `::ionViewCanEnter :is_logged_in va`, value );

                    if ( false === value )
                    {
                        this._app.getRootNav().setRoot(LoginComponent);

                        resolve ( false );

                    } else
                    {
                        resolve ( true );
                    }
                },
                ( error ) =>
                {
                    console.log ( `::ionViewCanEnter :is_logged_in er`, error );

                    this._app.getRootNav().setRoot(LoginComponent);

                    resolve ( false );
                }

            ).catch (

                ( ex ) =>
                {
                    console.log ( `::ionViewCanEnter :is_logged_in ex`, ex );

                    this._app.getRootNav().setRoot(LoginComponent);

                    resolve ( false );
                }

            );

        } );

    }

    //
    // Runs before the view can leave. This can be used as a sort of "guard" in authenticated
    // views where you need to check permissions before the view can leave
    //
    ionViewCanLeave ( ) : boolean
    {
        console.log ( `::ionViewCanLeave` );

        return true;
    }

    on_select_card ( )
    {
        console.log ( `::ionViewDidLoad` );

        this._socketService.engine_init ( );
    }

}
