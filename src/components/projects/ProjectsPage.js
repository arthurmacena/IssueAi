// @flow
import * as React from 'react';

import type { Repository } from '../commons/repository/repository';
import getRepositories from '../../lib/github';
import RepositoryGrid from '../commons/repository/RepositoryGrid';

type AppState = {
    repositoryList: Repository[],
    lastCursor: any,
};

function updateListState(data: Repository[], lastCursor: any) {
    return (state: AppState) => ({
        repositoryList: [...state.repositoryList, ...data],
        lastCursor,
    });
}

export default class ProjectsPage extends React.Component<void, AppState> {
    state = {
        repositoryList: [],
        lastCursor: null,
    };

    componentDidMount() {
        this.updateRepositoryList();
    }

    updateRepositoryList = () => {
        const { lastCursor } = this.state;
        getRepositories(lastCursor).then(data => {
            this.setState(updateListState(data.repos, data.lastCursor));
        });
    };

    render() {
        const { repositoryList } = this.state;
        return (
            <div>
                <RepositoryGrid repositories={repositoryList} />
                <div bp="grid vertical-center" className="footer">
                    <button
                        type="button"
                        bp="4 offset-5"
                        className="see-more"
                        onClick={this.updateRepositoryList}>
                        Ver mais
                    </button>
                </div>
            </div>
        );
    }
}
