import React, { Component } from 'react';
import { MDBFooter ,MDBContainer} from 'mdb-react-ui-kit'
class Footer extends Component {
    render() {
        return (
            <MDBFooter className='text-center text-white' style={{ backgroundColor: '#0a4275' }}>
                <MDBContainer className='p-4 pb-0'>
                    <section className=''>
                        <p className='d-flex justify-content-center align-items-center'>
                            <span className='me-3'>Register for free</span>
                            <button type='button' className='btn btn-outline-light btn-rounded'>
                                Sign up!
                            </button>
                        </p>
                    </section>
                </MDBContainer>

                <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    © 2020 Copyright: 
                    <a className='text-white' href='https://mdbootstrap.com/'>
                        ckationan@gmail.com
                    </a>
                </div>
            </MDBFooter>
        );
    }
}
export default Footer