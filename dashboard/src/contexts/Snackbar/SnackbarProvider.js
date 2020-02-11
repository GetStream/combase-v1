import React, { Component } from 'react';
import uuid from 'uuid/v4';
import delay from 'utils/delay';
import SnackbarContext from './index';
import Snackbar from './Snackbar';

class SnackbarProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            duration: 4000,
            show: false,
            snackbar: {
                isError: false,
                text: '',
            },
            queue: [],
            replace: null,
            addSnackbar: this.addSnackbar.bind(this),
            queueSnackbar: this.queueSnackbar.bind(this),
            removeSnackbar: this.removeSnackbar.bind(this),
        };
    }

    async componentDidUpdate(prevProps, prevState) {
        const { show } = this.state;
        if (!prevState.show && show) {
            await delay(5000);
            await this.removeSnackbar();
        }
    }

    queueSnackbar = (data, duration) => {
        const { show } = this.state;

        const snackbar = {
            ...data,
            uid: uuid(),
        };

        if (show) {
            this.setState(prevState => {
                if (snackbar.replace) {
                    return {
                        show: false,
                        replace: snackbar,
                    };
                }
                const queue = [...prevState.queue, snackbar];
                return {
                    queue,
                };
            });
        } else {
            this.addSnackbar(snackbar, duration);
        }
    };

    handleHideSnack = async () => {
        const { replace } = this.state;
        if (replace) {
            this.addSnackbar(replace);
        }
    };

    addSnackbar = async (snackbar, duration = 5000) => {
        await this.setState(prevState => {
            const { queue } = prevState;
            let newQ = [];
            if (queue.length > 0) {
                newQ = queue.filter(snack => snackbar.uid !== snack.uid);
            }
            return {
                show: true,
                snackbar,
                duration,
                queue: newQ,
                replace: null,
            };
        });
    };

    removeSnackbar = async () => {
        const { queue } = this.state;

        await this.setState({
            show: false,
        });

        await delay(500);

        if (queue.length > 0) {
            this.addSnackbar(queue[0]);
        }
    };

    resetSnackbar = () => {
        this.setState({
            snackbar: {
                isError: false,
                text: '',
            },
        });
    };

    render() {
        const { children } = this.props;
        return (
            <SnackbarContext.Provider value={this.state}>
                <>
                    {children}
                    <Snackbar
                        onHide={this.handleHideSnack}
                        show={this.state.show}
                        {...this.state.snackbar}
                    />
                </>
            </SnackbarContext.Provider>
        );
    }
}

export default SnackbarProvider;
