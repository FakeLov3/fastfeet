import React, { useState, useEffect } from 'react';

import { MdAdd } from 'react-icons/md';

import { Container, Content, Grid } from './styles';

import api from '~/services/api';

import HeaderPage from '~/components/HeaderPage';
import { SearchInput } from '~/components/Form';
import { IconButton } from '~/components/Button';

import DeliveryItem from './DeliveryItem';

export default function Delivery() {
	const [deliveries, setDeliveries] = useState([]);

	async function handleSearchDelivery(e) {
		const response = await api.get('/deliveries', {
			params: {
				q: e.target.value,
			},
		});

		setDeliveries(response.data);
	}

	useEffect(() => {
		async function loadDeliveries() {
			const response = await api.get('/deliveries');

			/* const data = response.data.map(delivery => {
				let status;

				if (delivery.signature) {
					status = {
						title: 'ENTREGUE',
						color: '#2CA42B',
						background: '#DFF0DF',
					};
				} else if (delivery.canceled_at) {
					status = {
						title: 'CANCELADA',
						color: '#DE3B3B',
						background: '#FAB0B0',
					};
				} else if (delivery.start_date) {
					status = {
						title: 'RETIRADA',
						color: '#4D85EE',
						background: '#BAD2FF',
					};
				} else {
					status = {
						title: 'PENDENTE',
						color: '#C1BC35',
						background: '#F0F0DF',
					};
				}

				return {
					...delivery,
					status,
				};
			}); */

			setDeliveries(response.data);
		}

		loadDeliveries();
	}, []);

	return (
		<Container>
			<Content>
				<HeaderPage title="Gerenciando encomendas">
					<SearchInput
						onChange={handleSearchDelivery}
						type="text"
						placeholder="Buscar por encomendas"
					/>
					<IconButton
						Icon={MdAdd}
						title="CADASTRAR"
						action={() => {}}
						type="submit"
					/>
				</HeaderPage>

				<Grid>
					<section>
						<strong>ID</strong>
						<strong>Destinatário</strong>
						<strong>Produto</strong>
						<strong>Cidade</strong>
						<strong>Estado</strong>
						<strong>Status</strong>
						<strong>Ações</strong>
					</section>
					{deliveries.map(delivery => (
						<DeliveryItem key={delivery.id} data={delivery} />
					))}
				</Grid>
			</Content>
		</Container>
	);
}