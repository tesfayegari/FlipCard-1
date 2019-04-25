import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './FlipCardWebPart.module.scss';
import * as strings from 'FlipCardWebPartStrings';

export interface IFlipCardWebPartProps {
  description: string;
}

export default class FlipCardWebPart extends BaseClientSideWebPart<IFlipCardWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles["flip-card"]}">
        <div class="${styles["flip-card-inner"]}">
          <div class="${styles["flip-card-front"]}">
            <img
              src="https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png"
              alt="Avatar"
              style="width:180px;height:180px;border-radius:50%"
            />
          </div>
          <div class="${styles["flip-card-back"]}">
            <h1>John Doe</h1>
            <p>Architect & Engineer</p>
            <p>We love that guy</p>
          </div>
        </div>
    </div>
    <div class="${styles["flip-card"]}">
        <div class="${styles["flip-card-inner"]}">
          <div class="${styles["flip-card-front"]}">
            <img
              src="https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png"
              alt="Avatar"
              style="width:180px;height:180px;border-radius:50%"
            />
          </div>
          <div class="${styles["flip-card-back"]}">
            <h1>John Doe</h1>
            <p>Architect & Engineer</p>
            <p>We love that guy</p>
          </div>
        </div>
    </div>

    <div class="${styles["flip-card"]}">
        <div class="${styles["flip-card-inner"]}">
          <div class="${styles["flip-card-front"]}">
            <img
              src="https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png"
              alt="Avatar"
              style="width:180px;height:180px;border-radius:50%"
            />
          </div>
          <div class="${styles["flip-card-back"]}">
            <h1>John Doe</h1>
            <p>Architect & Engineer</p>
            <p>We love that guy</p>
          </div>
        </div>
    </div>

    <div class="${styles["flip-card"]}">
        <div class="${styles["flip-card-inner"]}">
          <div class="${styles["flip-card-front"]}">
            <img
              src="https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png"
              alt="Avatar"
              style="width:180px;height:180px;border-radius:50%"
            />
          </div>
          <div class="${styles["flip-card-back"]}">
            <h1>John Doe</h1>
            <p>Architect & Engineer</p>
            <p>We love that guy</p>
          </div>
        </div>
    </div>
    `;
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
            }
          ]
        }
      ]
    };
  }
}
