import { SiteAppRoute } from '@/app/routes/main-site/config/routes.tsx';


export const getDialoguePageUrl = function (dialogueId: string): string {
    return `/${ SiteAppRoute.DIALOGUES }/${ dialogueId }`;
};