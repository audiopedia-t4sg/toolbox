import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import swal from 'sweetalert';

// Redux
import { connect } from 'react-redux';

// Style
import './PlaylistList.css';

// Custom Components
import EditPlaylist from '../EditPlaylist/EditPlaylist';

function PlaylistItem({
  playlist,
  index,
  setSelectedPlaylist,
  selectedPlaylist,
}) {
  const [showEditPlaylist, setShowEditPlaylist] = useState(false);

  const handleSelect = (e) => {
    e.preventDefault();
    setSelectedPlaylist(playlist);
  };

  const handleEdit = () => {
    setShowEditPlaylist(true);
  };

  const handleCloseEditPlaylist = () => {
    setShowEditPlaylist(false);
  };

  const deletePlaylist = () => {
    console.log('Woooah actually deleting this');
    swal('Poof! Your playlist has been deleted!', {
      icon: 'success',
    });
  };

  const handleDelete = () => {
    swal({
      title: `Are you sure you want to delete playlist: ${playlist.title}?`,
      text: 'You will not be able to recover this playlist!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deletePlaylist();
      } else {
        swal('Your playlist is safe!');
      }
    });
  };

  return (
    <>
      <Draggable draggableId={`id-${playlist.id}`} index={index}>
        {(provided) => (
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={
              selectedPlaylist.id === playlist.id
                ? 'selected-playlist-item'
                : 'playlist-item'
            }
          >
            <Row onClick={handleSelect}>
              <Col>
                <Card.Title>{playlist.title}</Card.Title>
              </Col>
              <Col className='playlist-item-buttons-container'>
                <Button
                  className='playlist-item-button'
                  variant='link'
                  onClick={handleEdit}
                >
                  <FaEdit />
                </Button>
                <Button
                  className='playlist-item-button'
                  variant='link'
                  onClick={handleDelete}
                >
                  <FaTrash />
                </Button>
              </Col>
            </Row>
          </Card>
        )}
      </Draggable>
      <EditPlaylist
        show={showEditPlaylist}
        handleClose={handleCloseEditPlaylist}
        playlist={playlist}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedPlaylist: state.playlist.selectedPlaylist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedPlaylist: (playlist) =>
      dispatch({ type: 'SET_SELECTEDTOPIC', payload: playlist }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItem);