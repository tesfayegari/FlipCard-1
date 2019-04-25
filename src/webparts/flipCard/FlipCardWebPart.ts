import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './FlipCardWebPart.module.scss';
import * as strings from 'FlipCardWebPartStrings';
import { PropertyFieldCustomList, CustomListFieldType } from 'sp-client-custom-fields/lib/PropertyFieldCustomList';

export interface IFlipCardWebPartProps {
  description: string;
  items: any[];
}

export default class FlipCardWebPart extends BaseClientSideWebPart<IFlipCardWebPartProps> {

  public render(): void {

    if (this.properties.items == null || this.properties.items.length == 0) {
      //Display select a list message
      this.domElement.innerHTML = `
        <div class="ms-MessageBar">
          <div class="ms-MessageBar-content">
            <div class="ms-MessageBar-icon">
              <i class="ms-Icon ms-Icon--Info"></i>
            </div>
            <div class="ms-MessageBar-text">
              Edit the webpart and add items to show
            </div>
          </div>
        </div>
      `;
      return;
    }

    var outputHtml: string = '';    

    for (var i = 0; i < this.properties.items.length; i++) {
      var newsItem: any = this.properties.items[i];
      var newsTitle: string = newsItem['Title'];
      var newsDesc: string = newsItem['Description'];
      var newsEnable: string = newsItem['Active'];
      var newsPicUrl: string = newsItem['Picture'];
      var newsLink: string = newsItem['LinkUrl'];

      if (newsEnable == "false")
        continue;

      outputHtml +=  `
          <div class="${styles["flip-card"]}">
            <div class="${styles["flip-card-inner"]}">
              <div class="${styles["flip-card-front"]}">
                <img
                  src="${newsPicUrl}"
                  alt="${newsTitle}"
                  style="width:180px;height:180px;border-radius:50%"
                />
                <h1>${newsTitle}</h1>
              </div>
              <div class="${styles["flip-card-back"]}">
                <h1>${newsTitle}</h1>
                <p>${newsDesc}</p>
                <a href="${newsLink}">Learn more ....</a>
              </div>
            </div>
        </div>
          `;

    }

    this.domElement.innerHTML = outputHtml;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            },
            {
              groupName: 'Manage Items',
              groupFields: [
                PropertyFieldCustomList('items', {
                  label: strings.Items,
                  value: this.properties.items,
                  headerText: 'Customize',
                  fields: [
                    { id: 'Title', title: 'Title', required: true, type: CustomListFieldType.string },
                    { id: 'Enable', title: 'Enable', required: true, type: CustomListFieldType.boolean },
                    { id: 'Description', title: 'Description', required: false, hidden: true, type: CustomListFieldType.string },
                    { id: 'Picture', title: 'Picture', required: true, hidden: true, type: CustomListFieldType.picture },
                    { id: 'LinkUrl', title: 'Link(Url)', required: true, hidden: true, type: CustomListFieldType.string }
                  ],
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  render: this.render.bind(this),
                  disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                  context: this.context,
                  properties: this.properties,
                  key: 'newsSliderListField'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
