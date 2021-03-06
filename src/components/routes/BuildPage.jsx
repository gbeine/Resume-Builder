import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

// Components
import DefaultTemplate from '../ui/Resume/Templates/Default/Default';
import FloatingButton from '../ui/FloatingButton/FloatingButton';
import Drawer from '../ui/Drawer/Drawer';
import ResumeDrawerItems from '../ui/Resume/ResumeDrawerItems/ResumeDrawerItems';
import A4Container from '../ui/Containers/A4Container';

// Utils
import { isObjectEmpty } from '../../utils/utils';

// Style
import style from '../ui/Containers/containers.scss';

const mapStateToProps = (state) => ({
    jsonResume: state.resume.jsonResume,
    togglableJsonResume: state.resume.togglableJsonResume,
});

const mapDispatchToProps = (dispatch) => ({});

class BuildPage extends Component {
    state = {
        drawerOpen: true,
    };

    toggleDrawer = () => {
        this.setState((prevState) => ({
            drawerOpen: !prevState.drawerOpen,
        }));
    };

    render() {
        const { history } = this.props;
        const { togglableJsonResume, jsonResume } = this.props;

        if (!togglableJsonResume || isObjectEmpty(togglableJsonResume)) {
            // if no resume, then return to home
            history.push('/upload');
            return null;
        }
        /*
         * console.log(togglableJsonResume);
         * console.log(jsonResume);
         */

        return (
            <div style={{ backgroundColor: '#e6f1ef' }}>
                <FloatingButton
                    onClick={this.toggleDrawer}
                />
                <Drawer
                    open={this.state.drawerOpen}
                    onClose={this.toggleDrawer}
                >
                    <ResumeDrawerItems
                        resume={togglableJsonResume}
                        jsonResume={jsonResume}
                        onClose={this.toggleDrawer}
                    />
                </Drawer>
                <A4Container
                    className={classNames({
                        [style['a4-container--align-center']]: !this.state.drawerOpen,
                        [style['a4-container--align-left']]: this.state.drawerOpen,
                    })}
                >
                    <DefaultTemplate
                        resume={togglableJsonResume}
                    />
                </A4Container>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildPage);
