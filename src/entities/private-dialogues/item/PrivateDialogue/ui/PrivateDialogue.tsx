import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './PrivateDialogue.module.scss';
import {
    DomainPrivateDialogueFull,
} from 'product-types/dist/private-dialogue/DomainPrivateDialogueFull';
import { ThunkState } from '@/app/redux/types/thunkError.ts';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import { Image } from '@/shared/ui-kit/image/Image/ui/Image.tsx';
import { FakeAvatar } from '@/shared/ui-kit/icons/FakeAvatar/ui/FakeAvatar.tsx';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';


export type PrivateDialogueProps =
    {
        dialogue: DomainPrivateDialogueFull;
        status: ThunkState;
    }
    & ComponentPropsWithoutRef<'article'>;

export const PrivateDialogue: FC<PrivateDialogueProps> = memo(function PrivateDialogue (props) {
    const { className, dialogue, status, ...other } = props;

    return (
        <article
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <Row>
                {
                    (dialogue.avatar || dialogue.user.avatar)
                    ? <Image alt=""
                             className={ css.image }
                             src={ dialogue.avatar || dialogue.user.avatar }
                    />
                    : <FakeAvatar
                        className={ css.image }
                        letter={ (dialogue.title || dialogue.user.login)[0] }
                    />
                }
                <Col>
                    <h3 className={ css.title }>{ dialogue.title || dialogue.user.login }</h3>
                    <p className={ css.message }>{ dialogue.messages[0]?.message ?? 'No message' }</p>
                </Col>
                <span>
                { status.isPending ? '[?]' : '[+]' }
                </span>
            </Row>
        </article>
    );
});