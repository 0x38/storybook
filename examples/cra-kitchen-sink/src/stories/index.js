import React from 'react';
import EventEmiter from 'eventemitter3';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withNotes, WithNotes } from '@storybook/addon-notes';
import { linkTo } from '@storybook/addon-links';
import WithEvents from '@storybook/addon-events';
import {
  withKnobs,
  text,
  number,
  boolean,
  color,
  select,
  array,
  date,
  object,
} from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';
import { withInfo, setInfoOptions } from '@storybook/addon-info';

import { Button, Welcome } from '@storybook/react/demo';

import App from '../App';
import Logger from './Logger';
import Container from './Container';

const EVENTS = {
  TEST_EVENT_1: 'test-event-1',
  TEST_EVENT_2: 'test-event-2',
  TEST_EVENT_3: 'test-event-3',
  TEST_EVENT_4: 'test-event-4',
};

const emiter = new EventEmiter();
const emit = emiter.emit.bind(emiter);

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

const InfoButton = () =>
  <span
    style={{
      fontFamily: 'sans-serif',
      fontSize: 12,
      textDecoration: 'none',
      background: 'rgb(34, 136, 204)',
      color: 'rgb(255, 255, 255)',
      padding: '5px 15px',
      margin: 10,
      borderRadius: '0px 0px 0px 5px',
    }}
  >
    {' '}Show Info{' '}
  </span>;

setInfoOptions({
  summary: 'This is common info',
});

storiesOf('Button', module)
  .addDecorator((storyFn, context) => withInfo('This is **Button** info')(storyFn)(context))
  .addDecorator(withKnobs)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>)
  .add('with notes', () =>
    <WithNotes notes={'A very simple button'}>
      <Button>Check my notes in the notes panel</Button>
    </WithNotes>
  )
  .add('with knobs', () => {
    const name = text('Name', 'Storyteller');
    const age = number('Age', 70, { range: true, min: 0, max: 90, step: 5 });
    const fruits = {
      apple: 'Apple',
      banana: 'Banana',
      cherry: 'Cherry',
    };
    const fruit = select('Fruit', fruits, 'apple');
    const dollars = number('Dollars', 12.5);

    // NOTE: color picker is currently broken
    const backgroundColor = color('background', '#ffff00');
    const items = array('Items', ['Laptop', 'Book', 'Whiskey']);
    const otherStyles = object('Styles', {
      border: '3px solid #ff00ff',
      padding: '10px',
    });
    const nice = boolean('Nice', true);

    // NOTE: put this last because it currently breaks everything after it :D
    const birthday = date('Birthday', new Date('Jan 20 2017'));

    const intro = `My name is ${name}, I'm ${age} years old, and my favorite fruit is ${fruit}.`;
    const style = { backgroundColor, ...otherStyles };
    const salutation = nice ? 'Nice to meet you!' : 'Leave me alone!';
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

    return (
      <div style={style}>
        <p>
          {intro}
        </p>
        <p>
          My birthday is: {new Date(birthday).toLocaleDateString('en-US', dateOptions)}
        </p>
        <p>
          My wallet contains: ${dollars.toFixed(2)}
        </p>
        <p>In my backpack, I have:</p>
        <ul>
          {items.map(item =>
            <li key={item}>
              {item}
            </li>
          )}
        </ul>
        <p>
          {salutation}
        </p>
      </div>
    );
  })
  .add('with setInfoOptions', () => {
    setInfoOptions('this info is **overridden** by setInfoOptions');
    return <Button onClick={action('clicked')}>Button with Info</Button>;
  });

storiesOf('App', module).add('full app', () => <App />);

storiesOf('Info Addon', module)
  .add(
    'Info default',
    withInfo(
      'Use the [info addon](https://github.com/storybooks/storybook/tree/master/addons/info) with its new painless API.'
    )(context =>
      <Container>
        click the <InfoButton /> label in top right for info about "{context.story}"
      </Container>
    )
  )
  .add(
    'Info with options',
    withInfo({
      summary:
        'Use the [info addon](https://github.com/storybooks/storybook/tree/master/addons/info) with its new painless API.',
      inline: false,
      propTables: false,
      header: false,
      source: true,
    })(context =>
      <Container>
        click the <InfoButton /> label in top right for info about "{context.story}" this button has
        very-very-very-very looooooong title
      </Container>
    )
  )
  .add(
    'Only info markdown',
    withInfo({
      summary: `# Quid fruticumque morte
        
        ## Indignantia factum tracto tamen
        
        Lorem markdownum condidit. Vittam quod modo vana **Bactrius**, oculos est maius,
        **in liquitur** dividuae: pectusque.
        
        - Velata et qui sequenti domito ferinas miserum
        - Cognita minus
        - Iuppiter et sinitis corpore haec
        - Forma pinetis mortemque accipiter meorum egi Erysicthona
        - Litora mixtaeque tellus passim erexit
        - Postquam Scythicis saevis et sermone minimus cremabo
        
        Muneris udis flumen quod. Meo vinci haec
        [ignoscite](http://nisi.org/recentipariter.aspx) insonuit Amoris Persei
        Thermodontiaca unum madebit thalamumque iniqui?
        
        ## Tumulumque transferre memorque insopitumque leves clipei lignum
        
        Ipsaque parte summo, et paravi admotas te demum castique nostri, audit metuunt
        inquit: vestigia? Formae potius Tritonidos et pars, iungat tum, gestare, *ardore
        cum*, ausum inscribenda incingitur digitis umbram. Aello electarumque huic et
        cunctatusque et verba alto atque et ignibus.
        
        Revellit *parari cum* quaeque sacrum gelido, colantur quae haec longe temptanti
        fatigat agat: in iuvat sed, oscula. Haec dictis inani nova et [illa
        mens](http://accipiter.org/vulnusredditus) quam ex lacus nulla, nam haud
        numeratur radios.
        
        ## Postquam levis nec aspera tum
        
        Nimiumque scopulum. Pars rupit.
        
        - Volatu Amor sine utere sitvs vini mitis
        - Unda causa exhausta
        - Cupidine ne quoque si quoquam tacitae
        - Mortis sensit
        - Obit non possint operum umbra laevum Telethusa
        - Stetit indueret
        
        Luctibus tuli? Ipsa tempora corpus illa alii in sacra sepulcri sanguis nova quem
        enim [aequora](http://figura.io/mittere), tenentis, mensas sed dea, non?`,
      inline: false,
      propTables: false,
      header: false,
      source: false,
    })(context =>
      <Container>
        click the <InfoButton /> label in top right for info about "{context.story}"
      </Container>
    )
  )
  .add(
    'Only component source',
    withInfo({
      summary: null,
      inline: false,
      propTables: false,
      header: false,
      source: true,
    })(context =>
      <Container>
        click the <InfoButton /> label in top right for info about "{context.story}"
      </Container>
    )
  )
  .add(
    'Only propTypes and header',
    withInfo({
      summary: null,
      inline: false,
      propTables: [Container],
      propTablesExclude: [InfoButton],
      header: true,
      source: false,
    })(context =>
      <div>
        click the <InfoButton /> label in top right for info about "{context.story}"
      </div>
    )
  )
  .add(
    'decoratorInfo',
    withInfo({
      summary:
        'Use the [info addon](https://github.com/storybooks/storybook/tree/master/addons/info) with its new painless API.',
      inline: false,
      sendToPanel: false,
      infoButton: true,
    })(context =>
      <Container>
        click the <InfoButton /> label in top right for info about "{context.story}"
      </Container>
    )
  )
  .add(
    'addons composition',
    withInfo('see Notes panel for composition info')(
      withNotes('Composition: Info(Notes())')(context =>
        <div>
          click the <InfoButton /> label in top right for info about "{context.story}"
        </div>
      )
    )
  )
  .addWithInfo(
    'deprecated addWithInfo',
    'Use the [info addon](https://github.com/storybooks/storybook/tree/master/addons/info) with its painful API.',
    context =>
      <div>
        click the <InfoButton /> label in top right for info about "{context.story}"
      </div>
  );

storiesOf('Addons composition', module)
  .addDecorator((storyFn, context) =>
    withInfo()(withNotes('the non-trivial form of addons composition')(storyFn))(context)
  )
  .add('with text', () => {
    setInfoOptions('this *button* contain **text**');
    return <Button onClick={action('clicked')}>Hello Button</Button>;
  })
  .add('with some emoji', () => {
    setInfoOptions('this *button* contain **some emoji**');
    return <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>;
  });

storiesOf('Centered Button', module)
  .addDecorator(centered)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>);

storiesOf('WithEvents', module)
  .addDecorator(getStory =>
    <WithEvents
      emit={emit}
      events={[
        {
          name: EVENTS.TEST_EVENT_1,
          title: 'Test event 1',
          payload: 0,
        },
        {
          name: EVENTS.TEST_EVENT_2,
          title: 'Test event 2',
          payload: 'Test event 2',
        },
        {
          name: EVENTS.TEST_EVENT_3,
          title: 'Test event 3',
          payload: {
            string: 'value',
            number: 123,
            array: [1, 2, 3],
            object: {
              string: 'value',
              number: 123,
              array: [1, 2, 3],
            },
          },
        },
        {
          name: EVENTS.TEST_EVENT_4,
          title: 'Test event 4',
          payload: [
            {
              string: 'value',
              number: 123,
              array: [1, 2, 3],
            },
            {
              string: 'value',
              number: 123,
              array: [1, 2, 3],
            },
            {
              string: 'value',
              number: 123,
              array: [1, 2, 3],
            },
          ],
        },
      ]}
    >
      {getStory()}
    </WithEvents>
  )
  .add('Logger', () => <Logger emiter={emiter} />);

storiesOf('withNotes', module)
  .add('with some text', withNotes('Hello guys')(() => <div>Hello guys</div>))
  .add('with some emoji', withNotes('My notes on emojies')(() => <p>🤔😳😯😮</p>))
  .add(
    'with a button and some emoji',
    withNotes('My notes on a button with emojies')(() =>
      <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
    )
  )
  .add('with old API', () =>
    <WithNotes notes="Hello">
      <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
    </WithNotes>
  );

storiesOf('component.base.Link', module)
  .addDecorator(withKnobs)
  .add('first', () =>
    <a>
      {text('firstLink', 'first link')}
    </a>
  )
  .add('second', () =>
    <a>
      {text('secondLink', 'second link')}
    </a>
  );

storiesOf('component.base.Span', module)
  .add('first', () => <span>first span</span>)
  .add('second', () => <span>second span</span>);

storiesOf('component.common.Div', module)
  .add('first', () => <div>first div</div>)
  .add('second', () => <div>second div</div>);

storiesOf('component.common.Table', module)
  .add('first', () =>
    <table>
      <tr>
        <td>first table</td>
      </tr>
    </table>
  )
  .add('second', () =>
    <table>
      <tr>
        <td>first table</td>
      </tr>
    </table>
  );

storiesOf('component.Button', module)
  .add('first', () => <button>first button</button>)
  .add('second', () => <button>first second</button>);

// Atomic

storiesOf('Cells/Molecules.Atoms/simple', module)
  .addDecorator(withKnobs)
  .add('with text', () =>
    <Button>
      {text('buttonText', 'Hello Button')}
    </Button>
  )
  .add('with some emoji', () => <Button>😀 😎 👍 💯</Button>);

storiesOf('Cells/Molecules/Atoms.more', module)
  .add('with text2', () => <Button>Hello Button</Button>)
  .add('with some emoji2', () => <Button>😀 😎 👍 💯</Button>);

storiesOf('Cells/Molecules', module)
  .add('with text', () => <Button>Hello Button</Button>)
  .add('with some emoji', () => <Button>😀 😎 👍 💯</Button>);

storiesOf('Cells.Molecules.Atoms', module)
  .add('with text2', () => <Button>Hello Button</Button>)
  .add('with some emoji2', () => <Button>😀 😎 👍 💯</Button>);
