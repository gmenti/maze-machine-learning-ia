
/**
 * Write a description of class AppPerceptron here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
public class AppPerceptron
{
    public static void main(String args[]){
        Perceptron rede = new Perceptron();
        
        rede.treinamento();
        rede.generalizacao();
    }
}
