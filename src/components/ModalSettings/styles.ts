import styled from 'styled-components';



export const Container = styled.div`
/* This component not exists styles */
.divHistory{
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: left;
		text-align: center;
		justify-content: center;
		background-color: var(--primary-color);
		min-height: 3rem;
		cursor: pointer;
		border-radius: 4px;
		border: none;
		color: var(--text-white-primary);
		margin-top: 0.25rem;
		padding: .25rem .25rem 0 .25rem;
		width: 100%;

		h5 {
			height: 100%;
			width: 100%;
			padding-left: 0;
			font-size: 1rem;

			div{
				padding: 0;
				margin: 0 auto;
				height: 1.5rem;
				width: 1.5rem;
			}
		}
	}
`

export const HeaderContainer = styled.div`
	margin-top: 0.5rem;

	.settingsChoice {
		background-color: var(--color-grey-primary);
		padding: 0.2rem;
		border-radius: 4px;
		display: flex;
		flex-direction: row;
		width: 100%;
		margin-top: 1rem;

	}
	.buttonPrimary{
		font-size: 0.875rem;
	}
`

export const ContainerOptions = styled.section`

	width: 100%;
	max-height: 100%;
	h1 {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-blue-primary);
	}
	h2 {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-blue-primary);
		padding-top: 0.45rem;
		padding-bottom: 0.45rem;
	}
	label{
		font-size: 0.875rem;
		font-weight: 400;
		min-width: fit-content;
		height: auto;
		align-self: flex-end;
		color: var(--text-blue-primary);
	}
	.AssociationTopic {
		padding-bottom: 0.25rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;
		min-width: 20rem;
		width: 16rem;
		max-width: 30rem;
		height: 32px;
	}
  	.SettingsOptions{
		padding-bottom: .25rem;

		.ListNameRow{
			display: inline-flex;
			padding-top: 0.25rem;

			label{
				align-self: center;
				white-space: pre;
			}
			span{
				align-self: center;
				color: var(--text-blue-primary);
				width: fit-content;
				white-space: nowrap;
			}
		}
		input{
			list-style: none;
			padding: .375rem .125rem .375rem .75rem;
			border-radius: 4px;
			border: 0.085rem solid var(--primary-color);
			outline: none;
			display: flex;
			flex: 1;
			max-height: 1.4rem;
			color: var(--text-blue-primary);
			font-size: 0.9rem;
			font-weight : 500;
			width: 13.25rem;
			&:hover{
				border: 0.125rem solid var(--primary-color-hover);
			}
			&:focus{
				border: .125rem solid var(--primary-color-hover);
			}
		}
  	}
  	.Email {
	padding-bottom: 0.25rem;

	h3 {
		display: flex;
		flex-direction: row;
		white-space: pre;
	}
  }
  	.Critical {
		padding-top: 0.25rem;
		color: var(--text-red-primary);
		div{
			
				display: flex;
			}
		button{
			flex: 2;
			width: 100%;
			position: relative;
			right: 0;
			margin-top:20px;
			&:hover{
				color: var(--color-white-primary)
			}
		}

		h1 {
			color: var(--text-red-primary);
		}
		p{
			
			
		}
		div {
			p{
				font-size: 0.875rem;
				padding-top: 0.25rem;
				padding-bottom: 0.25rem;
			}
			.Switch_Circ{
				top: .2rem;
				left: .1rem;
			}

		}

		.taskListArchive {
			display: inline;
		}

	}
	.spanSelect{
		margin-left: 0.2rem;
		border-radius: 4px;
		width: 100%;
		height: 1rem;

		div{
			border-color: var(--primary-color);
			border-radius: 3px;
			min-height: 0;
			margin: 0;
			padding: 0 0.1rem 0 0.2rem;

			div{
				color:  var(--text-blue-primary);
				font-weight : 500;
			}
		}
		&:hover{
			div{
				color: var(--text-blue-primary);
			}
		}
	}
`

export const ContainerMembers = styled.div`
	font-size: 1rem;
	font-weight: normal;
	white-space: nowrap;
	width: 100%;
	min-height: 25rem;
	display:flex;
	flex-direction:column;
	justify-content: start;
	height: 100%;

	.buttonPrimary{
		width: 100%;
		flex: 1;
		margin: 0 0 .5rem 0;
	}

	.tableMembers{
		overflow-y: scroll;
		border-spacing: 0;
		display: block;
		width: 100%;
		height: 300px;
		thead{
			align-items: center;
			background-color: var(--color-grey-secundary);
			color: var(--text-blue-primary);
			font-weight : bold;
			width: 100%;

			th{
				font-weight: normal;
				text-align: left;
				border-bottom: 2px solid var(--color-white-primary);
				vertical-align: middle;
				padding: .1rem .1rem;
				width: auto;
			}
			.thOptionsUser{
				.contentHeaderUserOptions{
					display:flex;
					padding: 0;
					align-items: center;
					.buttonPrimary{
						width: fit-content;
						margin: 5px;
						flex: 0;
					}
				}
			}
		}
		.tableMembersBody{
			justify-content: start;
		}
	}
  .ShowData{
	height: 2rem;
	width: 100%;
	display: flex;
	background-color: var(--color-grey-secundary);
	color: var(--text-blue-primary);
	margin-bottom: 0.5rem;
	border-radius: 4px;
	h4{
	  padding-left: 0.5rem;
	  font-size: 0.875rem;
	  font-weight: bold;
	  margin-top: auto;
	  margin-bottom: auto;
	}
	span{
	  font-weight: bold;
	  margin-top: auto;
	  margin-bottom: auto;
	}
	.OpenedValue{
	  padding-left: 0.5rem;
	  color: var(--text-red-primary);
	  font-size: 1.25rem;
	}
	.TotalValue{
	  font-size: 0.875rem;
	}
  }
`

export const ContainerAddUser = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	min-height: 24rem;
	width: 100%;
	align-items: flex-end;

	span{
		width: 100%;
		font-weight: bold;
		color: var(--text-blue-primary);
		margin-bottom: .25rem;
		display: flex;
		justify-content: space-between;
		}
	select{
		flex: 1 1;
		width: 100%;
		flex-direction: column;
		background-color: var(--color-white-primary);
		border-radius: 0.25rem;
		border: none;
		overflow: auto;
		margin-bottom: .25rem;

		:focus {
			box-shadow: 0 0 0 0;
			border: 0 none;
			outline: 0;
		}

		option{
			background-color: var(--color-grey-secundary);
			border-radius: 4px;
			padding: .25rem;
			margin: .15rem 0;
			color: var(--text-black-primary);

			:hover{
				background-color: var(--color-grey-primary);
			}

		}

		
	}
`

export const ContainerTrash = styled.div`
	display: contents;
	overflow: auto;

	.containerTableTrash{
		display: flex;
		width: 100%;
		overflow-x: auto;
		overflow-y: auto;
		border-radius: 4px;
		padding: 1rem 0;

		table{
			border-spacing: 0;

			thead{
				border-radius: 4px;
				align-items: center;

				tr{
					background-color: var(--color-grey-secundary);
					justify-content: center;
					align-items: left;

					th{
						color: var(--text-blue-primary);
						padding: .5rem 0 .25rem;
						padding-right: 1rem;
						white-space: nowrap;
						border-bottom: 2px solid var(--color-white-primary);
						font-weight: 400;
					}

					.thOptionsTrash{
						text-align: left;
						padding: .25rem 0 .25rem .5rem;
						span{
							padding: 0 .25rem;
							b{
								font-size: 1.5rem;
							}
						}
					}

				}
			}
		}
	}
	.divLoadingSpin{
		display: flex;
		flex: 1;
		margin: auto;
		min-height: 20rem;
	}
`

interface ContainerRowProps {
  status: Number
  isChecked: Boolean
}

export const ContainerRow = styled.tr<ContainerRowProps>`
	min-width: 100%;
	height: auto;
	flex: 1;
	flex-direction: row;
	//background-color: var(--color-white-secundary);
	background-color: ${props => props.status == 2 ? "var(--color-green-light-secundary)" : "var(--color-white-secundary)"};
	background-color: ${props => props.isChecked ? "var(--color-grey-primary)" : ""};
	margin : .15rem;
	border-radius: 4px;
	transition: all .1s;
	border-spacing: 1px solid var(--color-white-primary);
	margin-bottom: 2rem;
	align-items: center;
	overflow-x:hidden;
	overflow-y:scroll;
	:hover{
		transform: translateX(5px);
		box-shadow: 0px 0px 10px var(--primary-color);
	}
	.tdColor{
		flex: 1;
		padding:0;
		background-color: ${props => props.status == 2 ? "var(--color-green-light-primary)" : "var(--color-grey-primary)"};
		background-color: ${props => props.isChecked ? "var(--color-grey-primary)" : ""};
		border-radius: 4px 0 0 4px;
		div{
			width: 6px;
			display: flex;
			flex: 1;
			height: 100%;
		}
	}
	.tdId{
		color: var(--text-blue-primary);
		padding-left: 1.2rem;
			width: 1.875rem;
			max-width: 100%;
			padding-right: 0.9375rem;
	}
	.tdCheckBox{
		max-width: 100%;
			width: 1.5rem;
			padding-left: 0rem;
	}
	.tdStatus{
		font-weight: bold;
		color: ${props => props.status == 2 ? "var(--color-green-dark-primary)" : "var(--text-blue-primary)"};
		padding-left: 0.875rem;
			padding-right: 0.875rem;
			max-width: 100%;
			width: 7.1875rem;
	}
	.tdLocation{
		color: var(--text-blue-primary);
		max-width: 10rem;
		width: 10rem;
		padding-right: 2.5rem;
		padding-left: 0.875rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.tdDateDeleted{
		color: var(--text-blue-primary);
		max-width: 10rem;
		width: 10rem;
		padding-right: 2.5rem;
		padding-left: 0.875rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.tdDescription{
		text-align: justify;
		max-width: 15rem;
		max-height: 8rem;
		overflow: hidden;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		color: var(--text-blue-primary);
		display: -webkit-box;
		-webkit-line-clamp: 6;
		-webkit-box-orient: vertical;
	}
	.tdArchive{
		color: var(--text-blue-primary);
		max-width: 100%;
			width: 6.2rem;
			padding-left: 4rem;
			padding-right: 4rem;
		span {
			display: flex;
			flex: 1;
			width: 3.5rem;
			height: 3.5rem;
			max-width: 100%;
			border-radius: 4px;
			justify-content: center;
			align-items: center;
			text-align: center;
			margin: .15rem;
			padding: 0 1rem;
			border: 1px solid var(--color-blue-secundary);
			margin-right: .5rem;
			:hover{
				transform: scale(1.5);
			}
		}
	}
	.tdDateOpened{
		max-width: 100%;
		width: 20.2rem;
		align-content: center;
		padding-right: 1rem;
		color: var(--text-blue-primary);
	}
	.tdOwner{
		max-width: 100%;
		width: 9.1875rem;
		padding-right: 1rem;
		color: var(--text-blue-primary);
	}
	.tdDueDates {
		padding-right: 2.25rem ;
		max-width: 100%;
		padding-left: 0.25rem ;
		width: 9.1875rem;
		div{
			display: flex;
			flex: 1;
			flex-direction: column;
			color: var(--text-blue-primary);
			margin-right: .25rem ;
			span{
				margin-bottom: .25rem;
				text-decoration: line-through;
			}
			span:last-child{
				text-decoration: none;
			}
		}
	}
	.tdAssignedTo{
		display: flex;
		flex: 1;
		flex-direction: column;
		height: 100%;
		font-size: 1rem;
		color: var(--text-blue-primary);
		padding-right: 2.5rem;
		padding-left: 1.25rem;
		img{
			color: var(--color-blue-primary);
			margin-right: .25rem ;
		}
	}
	.tdComments{
		padding-right: 3.5rem;
		max-width: 100%;
		padding-left: 1.5rem;
		width: 8rem;
		align-content: center;
		overflow: hidden;
		text-overflow: ellipsis;
		color: var(--text-blue-primary);
		div{
			display: flex;
			flex: 1;
			flex-direction: column;
			border-bottom: 1px solid var(--color-grey-primary);
			p{
				margin-bottom: .25rem;
			}
			h6{
				font-size: .65rem;
				font-weight: bold
			}
		}
	}
`



