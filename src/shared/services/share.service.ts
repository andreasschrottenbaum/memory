declare var FB: any;

import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable()
export class ShareService {
  private loadedSDKs = Object;
  private initializedSDKs = Object;
  private loadAPI: Promise<any>;

  constructor() { }

  share(network, message, url): void {
    switch (network) {
      case 'facebook':
        FB.ui({
          method: 'share',
          href: url,
          quote: message
        });
        break;
      case 'google':
        const options = {
          contenturl: url,
          contentdeeplinkid: '/',
          clientid: environment.googleID,
          cookiepolicy: 'single_host_origin',
          prefilltext: message,
          calltoactionlabel: 'PLAY',
          calltoactionurl: url,
          calltoactiondeeplinkid: '/',
          callback: () => console.log('render')
        };

        (<any>window).gapi.interactivepost.render('googleShare', options);
        break;
      case 'twitter':
        window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(message) + '&url=' + encodeURIComponent(url));
        break;
    }
  }

  initNetwork(name): Promise<any> {
    switch (name) {
      case 'facebook':
        return new Promise((resolve) => {
          this.loadScript('//connect.facebook.net/de_DE/sdk.js').then(() => {
            if (this.initializedSDKs[name]) {
              resolve(true);
            }

            (<any>window).fbAsyncInit = () => {
              FB.init({
                appId            : environment.facebookID,
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v2.10'
              });

              this.initializedSDKs[name] = true;
              resolve(true);
            };
          });
        });
      case 'google':
        return new Promise((resolve) => {
          this.loadScript('//apis.google.com/js/client:platform.js').then(() => {
            (<any>window).___gcfg = {
              lang: 'de_DE',
              parsetags: 'onload'
            };

            resolve(true);
          });
        });
      case 'twitter':
        return new Promise((resolve) => {
          resolve(true);
        });
    }
  }

  private loadScript(url: string): Promise<any> {
    return new Promise((resolve) => {
      if (!this.loadedSDKs[url]) {
        this.loadedSDKs[url] = true;

        const node = document.createElement('script');
        node.src = url;
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);

        node.onload = () => resolve(true);
      } else {
        resolve(true);
      }
    });
  }
}
