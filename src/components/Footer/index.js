import React from 'react';
import Button from 'material-ui/Button';


const Footer = () => {
        return (
            <footer className="app-footer">
                <div className="d-flex flex-row justify-content-between">
                    <div>
                        <span> Copyright Company Name &copy; 2018</span>

                    </div>
                    <div>
                        {/*<Button*/}
                            {/*href="http://vies.ninja/#pricing"*/}
                            {/*target="_blank"*/}
                            {/*size="small"*/}
                            {/*variant="raised"*/}
                            {/*// className="text-secondary"*/}
                            {/*// color="primary"*/}
                        {/*>Upgrate trial version</Button>*/}
                      <Button
                        className="text-white"
                        href="http://vies.ninja/#pricing"
                        variant="raised"
                        color="primary"
                      >
                        Upgrate trial version
                      </Button>
                    </div>
                </div>
            </footer>
        );
    }
;

export default Footer;
