const makeGetSelectedWorkspaceForUser = require('./getSelectedWorkspaceForUser')

describe('Workspace :: getSelectedWorkspaceForUser', () => {
  it('delegates to workspaceRepository', async () => {
    const workspaceRepository = {
      selectedWorkspaceForUser: jest.fn(() => 'workspace'),
    }

    const getSelectedWorkspaceForUser = makeGetSelectedWorkspaceForUser({
      workspaceRepository,
    })

    const workspace = await getSelectedWorkspaceForUser(1)

    expect(workspace).toEqual('workspace')
    expect(workspaceRepository.selectedWorkspaceForUser).toHaveBeenCalledWith(1)
  })
})
