package testing;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.testng.annotations.Test;

public class testtest {

	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		WebDriver driver = new HtmlUnitDriver();
		driver.get("https://staging.tryhungry.com/");
		
		System.out.println(driver.getTitle());
		driver.quit();

        //driver.manage().window().maximize();
		
		// WebElement element = driver.findElement(By.cssSelector("#mce-EMAIL"));
    	// JavascriptExecutor jse = (JavascriptExecutor)driver;
    	
	  //     jse.executeScript("window.scrollBy(0,3000)", "");


    // 	jse.executeScript("arguments[0].scrollIntoView", element);
    	//			   ((JavascriptExecutor)driver).executeScript("window.scrollTo(0,"+element.getLocation().y+")");
	}
	
	@Test
	public void test(){
		WebDriver driver = new HtmlUnitDriver();
		driver.get("https://staging.tryhungry.com/");
		
		System.out.println(driver.getTitle());
		driver.quit();
		
	}

}
