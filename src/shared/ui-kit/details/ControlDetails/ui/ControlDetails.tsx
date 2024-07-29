import {
    FC,
    memo, ReactNode,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import {
    Details,
    DetailsProps,
} from '@/shared/ui-kit/details/Details/ui/Details.tsx';
import {
    DetailsTitle,
} from '@/shared/ui-kit/details/Details/ui/DetailsTitle/DetailsTitle.tsx';
import {
    DetailsBody,
} from '@/shared/ui-kit/details/Details/ui/DetailsBody/DetailsBody.tsx';
import classNames from 'classnames';
import css
    from '@/widgets/language/items/LanguageItem/ui/LanguageItem.module.scss';


export type ControlDetailsProps =
    {
        titleChildren: ReactNode;
    }
    & DetailsProps;

export const ControlDetails: FC<ControlDetailsProps> = memo(function ControlDetails (props) {
    const { titleChildren, children, open, ...other } = props;
    const detailsRef                                  = useRef<HTMLDetailsElement>(null);
    const [ opened, setOpened ]                       = useState<boolean>(open);

    useLayoutEffect(() => {
        if (detailsRef.current) {
            detailsRef.current.addEventListener('toggle', () => {
                setOpened(detailsRef.current.open);
            });
        }
    }, []);


    return (
        <Details
            { ...other }
            open={ opened }
            ref={ detailsRef }
        >
            <DetailsTitle
                className={ classNames(css.title, { [css.opened]: opened }) }
            >
                { titleChildren }
            </DetailsTitle>
            <DetailsBody>{ children }</DetailsBody>
        </Details>
    );
});