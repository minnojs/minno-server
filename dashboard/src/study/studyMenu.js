import {update_study_description, do_delete, do_sharing, do_duplicate, do_rename, do_tags, do_data, do_stat, do_restore, do_lock, do_publish, do_copy_url, do_make_public} from './studyActions';

const can_edit = study => !study.isReadonly && study.permission !== 'read only';
const can_see_data = study => study.has_data_permission;

const is_view = study => study.view;

const is_locked = study => study.is_locked;
const is_published = study => study.is_published;
const is_public = study => study.is_public;

const not = fn => study => !fn(study);

const settings = {
    'properties': [],
    'tags':[],
    'data':[],
    'stat':[],
    // 'restore':[],
    'delete':[],
    // 'rename':[],
    // 'description':[],
    // 'duplicate':[],
    // 'publish':[],
    // 'unpublish':[],
    // 'lock':[],
    // 'unlock':[],
    // 'deploy':[],
    // 'studyChangeRequest':[],
    // 'studyRemoval':[],
    // 'sharing':[],
    // 'public':[],
    // 'private':[],
    // 'unpublic':[],
    'copyUrl':[]
};

const settings_hash = {
    tags: {text: 'Tags',
        config: {
            display: [can_edit],
            onmousedown: do_tags,
            class: 'fa-tags'
        }},
    data: {text: 'Data',
        config: {
            display: [can_see_data],
            onmousedown: do_data,
            class: 'fa-download'
        }},
    stat: {text: 'Statistics',
        config: {
            display: [can_see_data],
            onmousedown: do_stat,
            class: 'fas.fa-bar-chart'
        }},
    restore: {text: 'Restore',
        config: {
            display: [can_edit],
            onmousedown: do_restore,
            class: 'fas.fa-undo'
        }},

    delete: {text: 'Delete Study',
        config: {
            display: [can_edit, not(is_locked)],
            onmousedown: do_delete,
            class: 'fa-remove'
        }},
    rename: {text: 'Rename Study',
        config: {
            display: [can_edit, not(is_locked)],
            onmousedown: do_rename,
            class: 'fa-exchange'
        }},
    description: {text: 'Change description',
        config: {
            display: [can_edit, not(is_locked)],
            onmousedown: update_study_description,
            class: 'fa-comment'
        }},
    properties: {text: 'Properties',
        config: {
            display: [not(is_view)],
            href: `/properties/`,
            class: 'fa-gear'
        }},
    duplicate: {text: 'Duplicate study',
        config: {
            display: [not(is_view)],

            onmousedown: do_duplicate,
            class: 'fa-clone'
        }},
    lock: {text: 'Lock Study',
        config: {
            display: [can_edit, not(is_locked)],
            onmousedown: do_lock,
            class: 'fa-lock'
        }},
    publish: {text: 'Publish Study',
        config: {
            display: [can_edit, not(is_locked), not(is_published)],
            onmousedown: do_publish,
            class: 'fa-cloud-upload'
        }},
    unpublish: {text: 'Unpublish Study', config: {
        display: [can_edit, is_published],
        onmousedown: do_publish,
        class: 'fa-cloud-upload'
    }},

    republish: {text: 'Republish Study', config: {
        display: [can_edit, not(is_published)],
        onmousedown: do_publish,
        class: 'fa-cloud-upload'
    }},

    public: {text: 'Make public', config: {
        display: [can_edit, not(is_locked), not(is_public)],
        onmousedown: do_make_public,
        class: 'fa-globe'
    }},

    private: {text: 'Make private', config: {
        display: [can_edit, not(is_locked), is_public],
        onmousedown: do_make_public,
        class: 'fa-globe'
    }},


    unlock: {text: 'Unlock Study',
        config: {
            display: [can_edit, is_locked],
            onmousedown: do_lock,
            class: 'fa-unlock'
        }},
    deploy: {text: 'Request Deploy',
        config: {
            display: [can_edit, not(is_locked)],
            href: `/deploy/`
        }},
    studyChangeRequest: {text: 'Request Change',
        config: {
            display: [can_edit, not(is_locked)],
            href: `/studyChangeRequest/`
        }},
    studyRemoval: {text: 'Request Removal',
        config: {
            display: [can_edit, not(is_locked)],
            href: `/studyRemoval/`
        }},
    sharing: {text: 'Sharing',
        config: {
            display: [can_edit],
            // href: `/sharing/`,
            onmousedown: do_sharing,

            class: 'fa-user-plus'
        }},
    copyUrl: {text: 'Copy Base URL',
        config: {
            onmousedown: do_copy_url,
            class: 'fa-link'
        }}
};


export const draw_menu = (study, notifications) => Object.keys(settings)
    .map(comp => {
        const config = settings_hash[comp].config;
        return !should_display(config, study) 
            ? '' 
            : config.href
                ? m('a.dropdown-item', { href: config.href+study.id, config: m.route }, [
                    m('i.fa.fa-fw.'+config.class),
                    settings_hash[comp].text
                ])
                : m('a.dropdown-item.dropdown-onclick', {onmousedown: config.onmousedown(study, notifications)}, [
                    m('i.fal.fa.fa-fw.'+config.class),
                    settings_hash[comp].text
                ]);
    });


function should_display(config, study){
    return !config.display || config.display.every(fn => fn(study));
}
