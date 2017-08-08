import React from 'react';
import ReactDOMServer from 'react-dom/server';
import addons from '@storybook/addons';
import deprecate from 'util-deprecate';
import Story from './components/Story';
import { EVENT_ID } from './config';
import { defaultOptions, defaultMarksyConf } from './defaults';

const channel = addons.getChannel();

const addonOptions = {
  globalOptions: defaultOptions,
  localOptions: {},
  isGlobalScope: true,

  setOptions(options) {
    if (this.isGlobalScope) {
      this.globalOptions = {
        ...this.globalOptions,
        ...options,
      };
      return this.globalOptions;
    }
    this.localOptions = {
      ...this.localOptions,
      ...options,
    };
    return this.localOptions;
  },

  globalScope() {
    this.isGlobalScope = true;
    this.localOptions = {};
  },

  localScope() {
    this.isGlobalScope = false;
    this.localOptions = {};
  },
};

function catchLocalOptions(storyFn, context) {
  addonOptions.localScope();
  const story = storyFn(context);
  const { localOptions, globalOptions } = addonOptions;
  addonOptions.globalScope();
  return { story, localOptions, globalOptions };
}

function sendToPanel(infoString) {
  channel.emit(EVENT_ID, {
    infoString,
  });
}

function addInfo(storyFn, context, infoOptions) {
  // Options could be overridden by setInfoOptions during storyFn execution
  const { story, globalOptions, localOptions } = catchLocalOptions(storyFn, context);

  const options = {
    ...globalOptions,
    ...infoOptions,
    ...localOptions,
  };

  const marksyConf = {
    ...defaultMarksyConf,
    ...options.marksyConf,
  };

  // props.propTables can only be either an array of components or null
  // propTables option is allowed to be set to 'false' (a boolean)
  // if the option is false, replace it with null to avoid react warnings
  const props = {
    info: options.info,
    context,
    showInline: Boolean(options.inline),
    showHeader: Boolean(options.header),
    showSource: Boolean(options.source),
    hideInfoButton: Boolean(!options.infoButton),
    propTables: options.propTables || null,
    propTablesExclude: options.propTablesExclude,
    styles: typeof options.styles === 'function' && options.styles,
    marksyConf,
    maxPropObjectKeys: options.maxPropObjectKeys,
    maxPropArrayLength: options.maxPropArrayLength,
    maxPropsIntoLine: options.maxPropsIntoLine,
    maxPropStringLength: options.maxPropStringLength,
  };

  const infoContent = (
    <Story {...props}>
      {story}
    </Story>
  );
  if (options.sendToPanel) {
    const infoString = ReactDOMServer.renderToString(infoContent);
    sendToPanel(infoString);
    return story;
  }
  return infoContent;
}

export const withInfo = textOrOptions => {
  const options = typeof textOrOptions === 'string' ? { info: textOrOptions } : textOrOptions;
  return storyFn => context => addInfo(storyFn, context, options);
};

export { Story };

export default {
  addWithInfo: deprecate(function addWithInfo(storyName, text, storyFn, options) {
    if (typeof storyFn !== 'function') {
      if (typeof text === 'function') {
        options = storyFn; // eslint-disable-line
        storyFn = text; // eslint-disable-line
        text = ''; // eslint-disable-line
      } else {
        throw new Error('No story defining function has been specified');
      }
    }
    return this.add(storyName, withInfo({ text, ...options })(storyFn));
  }, '@storybook/addon-info .addWithInfo() addon is deprecated, use withInfo() from the same package instead. \nSee https://github.com/storybooks/storybook/tree/master/addons/info'),
};

export function setInfoOptions(textOrOptions) {
  const options = typeof textOrOptions === 'string' ? { info: textOrOptions } : textOrOptions;
  return addonOptions.setOptions(options);
}

/*
Changes:
- [x] options.text -> options.info (breaking)
- [x] options.hideInfoButton -> !options.infoButton
- [x] { defaultOptions, defaultMarksyConf } moved to default.js
- [x] setDefaults -> setInfoOptions
- [x] same behavior of setInfoOptions as withInfo with textOrOptions
- [x] setInfoOptions, defaultOptions and withInfo supports the same set of options
- [x] removed decoratorInfo (set options.sendToPanel = false to use as decorator)

*/
