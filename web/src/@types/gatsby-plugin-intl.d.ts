// Type definitions for react-intl 2.3
// Project: http://formatjs.io/react/, https://github.com/yahoo/react-intl
// Definitions by: Bruno Grieder <https://github.com/bgrieder>,
//                 Christian Droulers <https://github.com/cdroulers>,
//                 Fedor Nezhivoi <https://github.com/gyzerok>,
//                 Till Wolff <https://github.com/tillwolff>,
//                 Karol Janyst <https://github.com/LKay>,
//                 Brian Houser <https://github.com/bhouser>,
//                 Krister Kari <https://github.com/kristerkari>
//                 Martin Raedlinger <https://github.com/formatlos>
//                 Kanitkorn Sujautra <https://github.com/lukyth>
//                 obedm503 <https://github.com/obedm503>
//                 anion155 <https://github.com/anion155>
//                 tkryskiewicz <https://github.com/tkryskiewicz>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

declare namespace GatsbyPluginIntl {
    type DateSource = Date | string | number;
    type MessageValue = string | number | boolean | Date | null | undefined;

    function changeLocale(locale: string): void;
    interface Locale {
        locale: string;
        fields?: { [key: string]: string };
        pluralRuleFunction?(n: number, ord: boolean): string;
    }

    type LocaleData = Locale[];

    interface InjectIntlConfig {
        intlPropName?: string;
        withRef?: boolean;
    }

    function injectIntl<P>(
        component: React.ComponentType<P & InjectedIntlProps>,
        options?: InjectIntlConfig
    ): React.ComponentClass<Pick<P, Exclude<keyof P, keyof InjectedIntlProps>>> & {
        WrappedComponent: React.ComponentType<P & InjectedIntlProps>;
    };

    function addLocaleData(data: Locale[] | Locale): void;

    type Messages<Names extends keyof any = string> = {
        [key in Names]: FormattedMessage.MessageDescriptor;
    };

    function defineMessages<Names extends keyof any>(messages: Messages<Names>): Messages<Names>;

    interface IntlConfig {
        locale: React.Requireable<any>;
        formats: React.Requireable<any>;
        messages: React.Requireable<any>;
        defaultLocale: React.Requireable<any>;
        defaultFormats: React.Requireable<any>;
        onError: React.Requireable<any>;
    }

    interface IntlFormat {
        formatDate: React.Requireable<any>;
        formatTime: React.Requireable<any>;
        formatRelative: React.Requireable<any>;
        formatNumber: React.Requireable<any>;
        formatPlural: React.Requireable<any>;
        formatMessage: React.Requireable<any>;
        formatHTMLMessage: React.Requireable<any>;
    }

    interface IntlShape extends IntlConfig, IntlFormat, React.Requireable<any> {
        now: React.Requireable<any>;
    }

    const intlShape: IntlShape;

    interface InjectedIntl {
        formatDate(value: DateSource, options?: FormattedDate.PropsBase): string;
        formatTime(value: DateSource, options?: FormattedTime.PropsBase): string;
        formatRelative(value: DateSource, options?: FormattedRelative.PropsBase & { now?: any }): string;
        formatNumber(value: number, options?: FormattedNumber.PropsBase): string;
        formatPlural(value: number, options?: FormattedPlural.Base): keyof FormattedPlural.PropsBase;
        formatMessage(
            messageDescriptor: FormattedMessage.MessageDescriptor,
            values?: { [key: string]: MessageValue }
        ): string;
        formatHTMLMessage(
            messageDescriptor: FormattedMessage.MessageDescriptor,
            values?: { [key: string]: MessageValue }
        ): string;
        locale: string;
        formats: any;
        messages: { [id: string]: string };
        defaultLocale: string;
        defaultFormats: any;
        now(): number;
        onError(error: string): void;
    }

    interface InjectedIntlProps {
        intl: InjectedIntl;
    }

    namespace IntlComponent {
        interface DateTimeFormatProps extends Intl.DateTimeFormatOptions {
            format?: string;
        }
    }

    namespace FormattedDate {
        type PropsBase = IntlComponent.DateTimeFormatProps;

        interface Props extends PropsBase {
            value: DateSource;
            children?: (formattedDate: string) => React.ReactNode;
        }
    }

    class FormattedDate extends React.Component<FormattedDate.Props> {}

    namespace FormattedTime {
        type PropsBase = IntlComponent.DateTimeFormatProps;

        interface Props extends PropsBase {
            value: DateSource;
            children?: (formattedTime: string) => React.ReactNode;
        }
    }
    class FormattedTime extends React.Component<FormattedTime.Props> {}

    namespace FormattedRelative {
        interface PropsBase {
            /*
             * one of "second", "minute", "hour", "day", "month" or "year"
             */
            units?: 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year';
            /*
             * one of "best fit" (default) | "numeric"
             */
            style?: 'best fit' | 'numeric';
            format?: string;
            updateInterval?: number;
            initialNow?: any;
        }

        interface Props extends PropsBase {
            value: DateSource;
            children?: (formattedRelative: string) => React.ReactNode;
        }
    }

    class FormattedRelative extends React.Component<FormattedRelative.Props> {}

    namespace FormattedMessage {
        interface MessageDescriptor {
            id: string;
            description?: string;
            defaultMessage?: string;
        }

        interface Props extends MessageDescriptor {
            values?: { [key: string]: MessageValue | JSX.Element };
            tagName?: React.ReactType;
            children?: (...formattedMessage: Array<string | JSX.Element>) => React.ReactNode;
        }
    }
    class FormattedMessage extends React.Component<FormattedMessage.Props> {}

    // class Link extends GatsbyLink<any> {
    //     language: string;
    // }

    class FormattedHTMLMessage extends React.Component<FormattedMessage.Props> {}

    namespace FormattedNumber {
        interface PropsBase extends Intl.NumberFormatOptions {
            format?: string;
        }

        interface Props extends PropsBase {
            value: number;
            children?: (formattedNumber: string) => React.ReactNode;
        }
    }
    class FormattedNumber extends React.Component<FormattedNumber.Props> {}

    namespace FormattedPlural {
        interface Base {
            /*
             * one of "cardinal" (default) | "ordinal"
             */
            style?: 'cardinal' | 'ordinal';
        }

        interface PropsBase extends Base {
            other: any;
            zero?: any;
            one?: any;
            two?: any;
            few?: any;
            many?: any;
        }

        interface Props extends PropsBase {
            value: number;
            children?: (formattedPlural: React.ReactNode) => React.ReactNode;
        }
    }
    class FormattedPlural extends React.Component<FormattedPlural.Props> {}

    class Link extends React.Component<any> {
        language: string;
    }

    namespace IntlProvider {
        interface Props {
            locale?: string;
            timeZone?: string;
            formats?: any;
            messages?: any;
            defaultLocale?: string;
            defaultFormats?: any;
            textComponent?: any;
            initialNow?: any;
            onError?: (error: string) => void;
        }
    }

    class IntlProvider extends React.Component<IntlProvider.Props> {
        getChildContext(): {
            intl: InjectedIntl;
        };
    }
}

declare module 'gatsby-plugin-intl' {
    export = GatsbyPluginIntl;
}
