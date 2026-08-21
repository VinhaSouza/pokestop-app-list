import { Button } from '../src/components/Button';
import { fireEvent, render } from '@testing-library/react-native';

describe('Button', () => {
    //Teste de Renderização
    it('Deve renderizar o texto do botão', async () => {
        const { getByText } = await render(<Button text="Entrar" />);

        expect(getByText('Entrar')).toBeTruthy();
    });
    //Teste de Interação
    it('Deve executar a função ao pressionar o botão', async () => {
        const onPressMock = jest.fn();

        const { getByText } = await render(<Button text="Entrar" onPress={onPressMock} />);

        fireEvent.press(getByText('Entrar'));
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it('Deve mostrar o indicador de carregamento', async () => {
        const { getByText } = await render(
            <Button text="Entrar" loading loadingText="Entrando..." />,
        );
        expect(getByText('Entrando...')).toBeTruthy();
    });
});
