import { PropOptions, VueConstructor } from 'vue';
import LibrarySettings from '../types/LibrarySettings';
import CustomProps from '../types/CustomProps';
import ComponentSettings from '../types/ComponentSettings';
import ComponentName from '../types/ComponentName';
export interface ImportedComponent extends VueConstructor {
    options?: {
        props?: {
            [key: string]: PropOptions;
        };
    };
}
declare const extractPropsFromComponentSettings: (customPropsValues: ComponentSettings, component: ImportedComponent) => CustomProps;
declare const extractPropsFromLibrarySettings: (options: LibrarySettings | undefined, componentName: ComponentName, component: ImportedComponent) => CustomProps;
export { extractPropsFromLibrarySettings, extractPropsFromComponentSettings };
